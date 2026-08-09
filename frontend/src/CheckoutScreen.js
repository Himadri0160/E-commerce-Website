// frontend/src/screens/CheckoutScreen.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutScreen({ cart, clearCart }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [isOrdered, setIsOrdered] = useState(false);
  const navigate = useNavigate();

  const placeOrderHandler = async (e) => {
    e.preventDefault();
    const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

    const orderData = {
      customerName: name,
      shippingAddress: address,
      cartItems: cart,
      totalPrice: totalPrice
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setIsOrdered(true);
        clearCart();
      }
    } catch (error) {
      console.error('Error placing order', error);
    }
  };

  if (isOrdered) {
    return (
      <div>
        <h2>Order Confirmation</h2>
        <p>Thank you for your purchase! Your order has been placed successfully.</p>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={placeOrderHandler} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', gap: '1rem' }}>
        <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} />
        <textarea placeholder="Shipping Address" required value={address} onChange={(e) => setAddress(e.target.value)} />
        {/* Placeholder for Payment Gateway Integration */}
        <div style={{ padding: '1rem', background: '#f9f9f9', border: '1px solid #ccc' }}>
          <p><em>Payment processing will be handled here securely.</em></p>
        </div>
        <button type="submit" disabled={cart.length === 0}>Place Order</button>
      </form>
    </div>
  );
}

export default CheckoutScreen;