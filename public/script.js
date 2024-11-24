document.addEventListener('DOMContentLoaded', async () => {
    const productContainer = document.getElementById('product-container');

    // Helper function: Convert RGB to HEX
    const rgbToHex = (rgb) => {
        const result = rgb.match(/\d+/g).map(Number);
        return (
            '#' +
            result
                .map((x) => x.toString(16).padStart(2, '0'))
                .join('')
                .toUpperCase()
        );
    };

    try {
        // Fetch product data from the backend
        const response = await fetch('http://localhost:3000/products');
        const products = await response.json();

        // Create product cards dynamically
        products.forEach((product) => {
            const productCard = document.createElement('div');
            productCard.className = 'swiper-slide product-card';

            let selectedColor = 'yellow'; // Default color

            productCard.innerHTML = `
                <img src="${product.images[selectedColor]}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">${
                    product.price !== 'N/A' ? `$${product.price}` : 'N/A'
                }</p>
                <p class="gold-type">Yellow Gold</p>
                <div class="color-picker">
                    <button style="background-color: #E6CA97;" title="Yellow Gold"></button>
                    <button style="background-color: #D9D9D9;" title="White Gold"></button>
                    <button style="background-color: #E1A4A9;" title="Rose Gold"></button>
                </div>
                <p class="popularity">${(product.popularityScore / 20).toFixed(
                    1
                )} / 5</p>
            `;

            // Add color-picker functionality
            const buttons = productCard.querySelectorAll('.color-picker button');
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    // Map button background color to image key
                    const colorMap = {
                        '#E6CA97': 'yellow',
                        '#D9D9D9': 'white',
                        '#E1A4A9': 'rose',
                    };

                    const buttonColor = rgbToHex(
                        button.style.backgroundColor.replace(/\s+/g, '')
                    ); // Convert RGB to HEX
                    const mappedColor = colorMap[buttonColor];

                    if (mappedColor && product.images[mappedColor]) {
                        // Update the image and gold type
                        selectedColor = mappedColor;
                        productCard.querySelector('img').src =
                            product.images[selectedColor];
                        productCard.querySelector('.gold-type').textContent =
                            button.title || 'Gold';
                    } else {
                        console.error(
                            'Error: Color not mapped or image not found for',
                            buttonColor
                        );
                    }
                });
            });

            productContainer.appendChild(productCard);
        });

        // Initialize Swiper carousel
        new Swiper('.swiper-container', {
            slidesPerView: 4, // Show 4 slides at a time
            spaceBetween: 20, // Spacing between slides
            loop: true, // Enable seamless looping
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
                1280: {
                    slidesPerView: 4,
                },
            },
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        productContainer.innerHTML =
            '<p>Error loading products. Please try again later.</p>';
    }
});
