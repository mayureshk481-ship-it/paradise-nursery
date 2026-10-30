import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import AboutUs from './AboutUs.jsx';
import './App.css';

function App() {
  // Which page is showing: 'home', 'plants' or 'cart'
  const [currentPage, setCurrentPage] = useState('home');

  const goToHome = () => setCurrentPage('home');
  const goToPlants = () => setCurrentPage('plants');
  const goToCart = () => setCurrentPage('cart');

  return (
    <div className="app-container">
      {currentPage === 'home' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1 className="company-name">Paradise Nursery</h1>
            <p className="company-tagline">Where Green Meets Serenity</p>
            <button className="get-started-button" onClick={goToPlants}>
              Get Started
            </button>
          </div>
          <div className="about-us-container">
            <AboutUs />
          </div>
        </div>
      )}

      {currentPage === 'plants' && (
        <ProductList
          onHomeClick={goToHome}
          onPlantsClick={goToPlants}
          onCartClick={goToCart}
        />
      )}

      {currentPage === 'cart' && (
        <CartItem
          onHomeClick={goToHome}
          onPlantsClick={goToPlants}
          onCartClick={goToCart}
          onContinueShopping={goToPlants}
        />
      )}
    </div>
  );
}

export default App;
