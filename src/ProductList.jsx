import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import './ProductList.css';

// Builds a small plant thumbnail (an inline SVG image) so the app works without any image files.
// You can replace any "image" value below with a real photo URL if you prefer.
const makeImage = (emoji, color) => {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">` +
    `<rect width="300" height="300" fill="${color}"/>` +
    `<circle cx="150" cy="150" r="105" fill="rgba(255,255,255,0.55)"/>` +
    `<text x="150" y="150" font-size="120" text-anchor="middle" dominant-baseline="central">${emoji}</text>` +
    `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
};

// Three categories, six unique plants each
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: makeImage('🌿', '#bfe3c6'), description: 'Produces oxygen at night and removes indoor toxins.', cost: 15 },
      { name: 'Spider Plant', image: makeImage('🌱', '#d4ecb8'), description: 'Easy to grow and great at freshening indoor air.', cost: 12 },
      { name: 'Peace Lily', image: makeImage('🌸', '#e6d9f2'), description: 'Elegant white blooms that help clean the air.', cost: 18 },
      { name: 'Boston Fern', image: makeImage('🍃', '#c3e8d2'), description: 'Lush fronds that add humidity and remove pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: makeImage('🪴', '#cfe5c1'), description: 'Glossy leaves that absorb airborne chemicals.', cost: 17 },
      { name: 'Areca Palm', image: makeImage('🌴', '#bfe9d9'), description: 'A natural humidifier with feathery, tropical fronds.', cost: 24 },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: makeImage('🌸', '#e3d4f5'), description: 'Calming scent that helps you relax and sleep.', cost: 20 },
      { name: 'Jasmine', image: makeImage('🌼', '#fbeec2'), description: 'Sweet, fragrant flowers that fill a room.', cost: 18 },
      { name: 'Rosemary', image: makeImage('🌿', '#cfe8d3'), description: 'Fragrant herb that is great for cooking too.', cost: 15 },
      { name: 'Mint', image: makeImage('🍃', '#c9f0d9'), description: 'Fresh, cooling aroma that grows quickly.', cost: 10 },
      { name: 'Lemon Balm', image: makeImage('🌱', '#e6f2b5'), description: 'Lemon-scented leaves that soothe and uplift.', cost: 14 },
      { name: 'Basil', image: makeImage('🌾', '#cdeab4'), description: 'A sweet, peppery herb for the kitchen windowsill.', cost: 9 },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'Aloe Vera', image: makeImage('🌵', '#c8ecd0'), description: 'Soothing gel plant that needs very little water.', cost: 14 },
      { name: 'Jade Plant', image: makeImage('🍀', '#bfe6c8'), description: 'A hardy succulent said to bring good luck.', cost: 16 },
      { name: 'ZZ Plant', image: makeImage('🪴', '#cfe3c4'), description: 'Thrives in low light and forgives missed waterings.', cost: 22 },
      { name: 'Golden Barrel Cactus', image: makeImage('🌵', '#f6e6b0'), description: 'A round, sun-loving cactus that needs almost no care.', cost: 19 },
      { name: 'Haworthia', image: makeImage('🌱', '#d2ecc0'), description: 'A tiny striped succulent perfect for desks.', cost: 11 },
      { name: 'Pothos', image: makeImage('🌿', '#bde4c9'), description: 'Trailing vines that grow almost anywhere.', cost: 13 },
    ],
  },
];

function ProductList({ onHomeClick, onPlantsClick, onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Total number of items in the cart (shown on the cart icon)
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // True when a plant is already in the cart (its button is then disabled)
  const isInCart = (plantName) => cartItems.some((item) => item.name === plantName);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  const handleNavClick = (e, action) => {
    e.preventDefault();
    action();
  };

  return (
    <div>
      {/* Navbar: Home, Plants, Cart */}
      <div className="navbar">
        <div className="navbar-brand">Paradise Nursery</div>
        <div className="navbar-links">
          <a href="#home" onClick={(e) => handleNavClick(e, onHomeClick)}>Home</a>
          <a href="#plants" onClick={(e) => handleNavClick(e, onPlantsClick)}>Plants</a>
          <a href="#cart" className="cart-link" onClick={(e) => handleNavClick(e, onCartClick)}>
            <svg className="cart-icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" aria-label="Shopping cart">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="#ffffff" />
              <circle cx="184" cy="216" r="12" fill="#ffffff" />
              <path
                d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none"
                stroke="#ffffff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="20"
              />
            </svg>
            <span className="cart-count">{totalItems}</span>
          </a>
        </div>
      </div>

      {/* Plant categories */}
      <div className="product-grid">
        {plantsArray.map((category) => (
          <div key={category.category}>
            <h2 className="category-title">{category.category}</h2>
            <div className="product-list">
              {category.plants.map((plant) => (
                <div className="product-card" key={plant.name}>
                  <img className="product-image" src={plant.image} alt={plant.name} />
                  <h3 className="product-title">{plant.name}</h3>
                  <p className="product-description">{plant.description}</p>
                  <div className="product-price">${plant.cost}</div>
                  <button
                    className={isInCart(plant.name) ? 'product-button added' : 'product-button'}
                    onClick={() => handleAddToCart(plant)}
                    disabled={isInCart(plant.name)}
                  >
                    {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
