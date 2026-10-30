import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';
import './CartItem.css';

function CartItem({ onHomeClick, onPlantsClick, onCartClick, onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Number of items shown on the cart icon
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Total cost for one plant (unit price x quantity)
  const calculateTotalCost = (item) => item.cost * item.quantity;

  // Total amount for every plant in the cart
  const calculateTotalAmount = () =>
    cartItems.reduce((total, item) => total + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Going below 1 removes the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
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

      <div className="cart-container">
        <h2 className="cart-heading">Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Add some plants to get started!</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit price: ${item.cost}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button
                      className="cart-item-button"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                </div>
                <button className="cart-item-delete" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="total-cart-amount">Total Cart Amount: ${calculateTotalAmount()}</div>

        <div className="cart-actions">
          <button className="continue-shopping-button" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-button" onClick={handleCheckoutShopping}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
