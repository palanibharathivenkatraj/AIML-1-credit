const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve images from frontend/images folder
app.use('/images', express.static(path.join(__dirname, '../frontend/images')));

// Connect to MongoDB & AUTO-SEED
const Product = require('./models/Product');
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce')
  .then(async () => {
    console.log('MongoDB connected ✅');

    // 🔥 AUTO-SEED if empty
    const count = await Product.countDocuments();
    if (count === 0) {
      console.log('Seeding products...');
      const sampleProducts = [
        { name: 'Boys Graphic T-Shirt', description: '100% cotton printed tee', price: 699, image: 'images/tshirt.jpg', category: 'Boys', countInStock: 30 },
        { name: 'Girls Dress', description: 'Stylish dress', price: 999, image: 'images/dress.jpg', category: 'Girls', countInStock: 25 },
        { name: 'Girls Gown', description: 'Party wear gown', price: 1499, image: 'images/gown.jpg', category: 'Girls', countInStock: 20 },
        { name: 'Boys Denim Jacket', description: 'Classic denim jacket', price: 1299, image: 'images/jacket.jpg', category: 'Boys', countInStock: 20 },
        { name: 'Girls Jeans', description: 'Skinny jeans', price: 899, image: 'images/jeans.jpg', category: 'Girls', countInStock: 18 },
        { name: 'Boys Hoodie', description: 'Soft hoodie', price: 1099, image: 'images/hoodie.jpg', category: 'Boys', countInStock: 35 },
        { name: 'Girls Skirt', description: 'Pleated skirt', price: 699, image: 'images/skirt.jpg', category: 'Girls', countInStock: 22 },
        { name: 'Boys Shorts', description: 'Summer shorts', price: 499, image: 'images/shorts.jpg', category: 'Boys', countInStock: 40 },
        { name: 'Girls Cardigan', description: 'Light cardigan', price: 899, image: 'images/cardigan.jpg', category: 'Girls', countInStock: 28 }
      ];
      await Product.insertMany(sampleProducts);
      console.log('✅ 9 products seeded automatically!');
    } else {
      console.log(`Found ${count} products`);
    }
  })
  .catch(err => console.log('MongoDB Error:', err));

// Routes
const productRoutes = require('./routes/products');

const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});