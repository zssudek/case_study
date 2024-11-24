# Product Listing Application

This is a **Product Listing Application** designed to showcase engagement rings with real-time price calculation based on live gold prices. The project features a dynamic backend API and a responsive frontend.

---

## Features

### Backend
- **RESTful API**:
  - Provides product data from `products.json`.
  - Fetches real-time gold prices from [GoldAPI](https://goldapi.io).
- **Dynamic Price Calculation**:
  - Price = `(popularityScore + 1) × weight × goldPrice` (adjusted for 18k gold).
- **Environment Variables**:
  - Secure API key management using `.env`.

### Frontend
- **Responsive Design**:
  - Fully responsive for desktop and mobile.
- **Interactive Carousel**:
  - Built with [Swiper.js](https://swiperjs.com/), supporting smooth transitions and infinite looping.
- **Color Picker**:
  - Switches ring images based on selected color.
- **Popularity Score**:
  - Displayed out of 5 with one decimal place.

---

## Project Structure

```
product-api/
├── public/
│   ├── index.html       # Main HTML file
│   ├── styles.css       # CSS for styling
│   ├── script.js        # Frontend JavaScript
│   ├── fonts/           # Custom fonts (Montserrat, Avenir)
├── index.js             # Backend API server
├── products.json        # Product data (mock JSON)
├── .env                 # Environment variables (e.g., GoldAPI key)
├── package.json         # Node.js dependencies and scripts
└── README.md            # Documentation
```

---

## Installation and Setup

### Prerequisites
- Install [Node.js](https://nodejs.org/).
- Create an account on [GoldAPI](https://goldapi.io) to get your API key.

### Clone the Repository
```bash
git clone https://github.com/zssudek/case_study.git
cd case_study
```

### Backend Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Add a `.env` file in the root directory with your GoldAPI key:
   ```plaintext
   GOLDAPI_KEY=goldapi-13pct8ansm3vyrxar-io
   ```
3. Start the backend server:
   ```bash
   node index.js
   ```
4. The backend API will run at `http://localhost:3000/products`.

### Frontend Setup
1. Ensure `script.js` points to the correct API URL:
   ```javascript
   const response = await fetch('http://localhost:3000/products'); // Replace with your backend URL if deployed
   ```
2. Open `public/index.html` in your browser to test the frontend.

---

## Deployment

### Backend Deployment
- Deploy the backend (`index.js` and `products.json`) using platforms like **Render**, **Railway**, or **Heroku**.
- Add `GOLDAPI_KEY` as an environment variable in the deployment settings.

### Frontend Deployment
- Deploy the frontend using **Vercel**:
  1. Upload the `public/` folder.
  2. Update `script.js` to point to the deployed backend API URL.
  3. Get your live frontend URL (e.g., `https://your-project.vercel.app`).

---

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - Axios
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - [Swiper.js](https://swiperjs.com)
- **API**:
  - [GoldAPI](https://goldapi.io) for real-time gold prices.

---

## Future Enhancements

1. Add more product filters (e.g., price range, popularity).
2. Implement user authentication for personalized experiences.
3. Optimize for better SEO and accessibility.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Author

**Zeynep Sudek (zssudek)**  
Feel free to connect or reach out for collaboration on [GitHub](https://github.com/zssudek).
