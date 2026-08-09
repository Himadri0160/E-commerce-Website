// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Product, Order } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your actual MongoDB URI)
mongoose.connect('mongodb://localhost:27017/ecommerce-basic', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// --- API ENDPOINTS ---

// 1. Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// 2. Create an order (Checkout)
app.post('/api/orders', async (req, res) => {
  try {
    const { customerName, shippingAddress, cartItems, totalPrice } = req.body;
    
    const newOrder = new Order({
      customerName,
      shippingAddress,
      orderItems: cartItems,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));