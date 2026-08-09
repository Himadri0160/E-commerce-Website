// frontend/src/screens/CartScreen.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartScreen({ cart, removeFromCart }) {
  const navigate = useNavigate();
  const totalPrice = cart.reduce((a, c) => a + c.price * c.qty, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : (
        <div>
          {cart.map(item => (
            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid #eee' }}>
              <p>{item.name} - {item.qty} x ${item.price}</p>
              <button onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default CartScreen;