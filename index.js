const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
const path = require('path');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Load products.json
const products = JSON.parse(fs.readFileSync('products.json'));

// Global variable for caching the gold price
let cachedGoldPrice = null;

// Function to fetch and cache the gold price
const fetchGoldPrice = async () => {
    if (cachedGoldPrice) {
        console.log('Using cached gold price:', cachedGoldPrice);
        return cachedGoldPrice;
    }

    try {
        const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
            headers: {
                'x-access-token': process.env.GOLDAPI_KEY,
                'Content-Type': 'application/json',
            },
        });

        cachedGoldPrice = response.data.price_gram_24k || 60; // Fallback to $60 per gram
        console.log('Fetched new gold price:', cachedGoldPrice);
        return cachedGoldPrice;
    } catch (error) {
        console.error('Error fetching gold price, using fallback:', error.message);
        return 60; // Fallback to $60 per gram
    }
};

// Helper function to calculate price
const calculatePrice = async (product, goldPricePerGram) => {
    try {
        if (!goldPricePerGram || isNaN(goldPricePerGram)) {
            console.error('Invalid gold price:', goldPricePerGram);
            return {
                ...product,
                price: 'N/A',
            };
        }

        const popularityScore = parseFloat(product.popularityScore);
        const weight = parseFloat(product.weight);

        if (isNaN(popularityScore) || isNaN(weight)) {
            console.error('Invalid product data:', product.name, {
                popularityScore,
                weight,
            });
            return {
                ...product,
                price: 'N/A',
            };
        }

        return {
            ...product,
            price: ((popularityScore + 1) * weight * goldPricePerGram).toFixed(2),
        };
    } catch (error) {
        console.error('Error calculating price for product:', product.name, error.message);
        return {
            ...product,
            price: 'N/A',
        };
    }
};

// Endpoint to get all products with prices
app.get('/products', async (req, res) => {
    const goldPricePerGram = await fetchGoldPrice();

    console.log('Gold Price Per Gram:', goldPricePerGram);

    const updatedProducts = await Promise.all(
        products.map((product) => calculatePrice(product, goldPricePerGram))
    );

    console.log('Updated Products:', updatedProducts);

    res.json(updatedProducts);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
