# Paradise Nursery

Paradise Nursery is an online plant shop built with React and Redux Toolkit. Visitors can browse houseplants by category, add plants to a shopping cart, and manage the items in their cart.

## Project Name
Paradise Nursery Shopping Application

## Features
- Landing page with the company name, a background image, an About Us section and a **Get Started** button
- Plant listing page with 18 houseplants in 3 categories (Air Purifying, Aromatic and Low Maintenance), each with a thumbnail, name, description and price
- **Add to Cart** buttons that add the plant, disable themselves after it is added, and update the cart icon count
- Navigation bar with **Home**, **Plants** and **Cart** links on the plant listing and cart pages
- Shopping cart page with the thumbnail, name and unit price of each plant, a total cost per plant, and a total cart amount
- Buttons to increase or decrease quantity and to delete a plant
- **Checkout** button that shows "Coming Soon" and a **Continue Shopping** button that returns to the plant listing

## Tech Stack
- React 18
- Redux Toolkit and React-Redux
- Vite

## Project Structure
```
src/
  App.jsx          Landing page and page switching
  App.css          Landing page background and navbar styles
  AboutUs.jsx      Company details
  ProductList.jsx  Plant listing page
  ProductList.css
  CartItem.jsx     Shopping cart page
  CartItem.css
  CartSlice.jsx    Redux slice for the cart (addItem, removeItem, updateQuantity)
  store.js         Redux store
  main.jsx         App entry point
```

## Getting Started
1. Clone the repository
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local address that Vite prints in your terminal (usually http://localhost:5173)
