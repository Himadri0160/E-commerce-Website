// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exist = cart.find((x) => x._id === product._id);
    if (exist) {
      setCart(cart.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (product) => {
    setCart(cart.filter((x) => x._id !== product._id));
  };

  const clearCart = () => setCart([]);

  return (
    <Router>
      <div>
        <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
          <Link to="/" style={{ color: '#fff', marginRight: '1rem' }}>Home</Link>
          <Link to="/cart" style={{ color: '#fff' }}>Cart ({cart.length})</Link>
        </nav>
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<HomeScreen addToCart={addToCart} />} />
            <Route path="/cart" element={<CartScreen cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<CheckoutScreen cart={cart} clearCart={clearCart} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;