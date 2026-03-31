const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// 🔥 SAMPLE PRODUCTS
const sampleProducts = [
  {
    name: 'Boys Graphic T-Shirt',
    description: '100% cotton printed tee',
    price: 699,
    image: 'images/tshirt.jpg',
    category: 'Boys',
    countInStock: 30
  },
  {
    name: 'Girls Dress',
    description: 'Stylish dress',
    price: 999,
    image: 'images/dress.jpg',
    category: 'Girls',
    countInStock: 25
  },
  {
    name: 'Girls Gown',
    description: 'Party wear gown',
    price: 1499,
    image: 'images/gown.jpg',
    category: 'Girls',
    countInStock: 20
  },
  {
    name: 'Boys Denim Jacket',
    description: 'Classic denim jacket',
    price: 1299,
    image: 'images/jacket.jpg',
    category: 'Boys',
    countInStock: 20
  },
  {
    name: 'Girls Jeans',
    description: 'Skinny jeans',
    price: 899,
    image: 'images/jeans.jpg',
    category: 'Girls',
    countInStock: 18
  },
  {
    name: 'Boys Hoodie',
    description: 'Soft hoodie',
    price: 1099,
    image: 'images/hoodie.jpg',
    category: 'Boys',
    countInStock: 35
  },
  {
    name: 'Girls Skirt',
    description: 'Pleated skirt',
    price: 699,
    image: 'images/skirt.jpg',
    category: 'Girls',
    countInStock: 22
  },
  {
    name: 'Boys Shorts',
    description: 'Summer shorts',
    price: 499,
    image: 'images/shorts.jpg',
    category: 'Boys',
    countInStock: 40
  },
  {
    name: 'Girls Cardigan',
    description: 'Light cardigan',
    price: 899,
    image: 'images/cardigan.jpg',
    category: 'Girls',
    countInStock: 28
  }
];

// 🔥 SEED PRODUCTS
router.get('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    const created = await Product.insertMany(sampleProducts);
    res.json(created);
  } catch (error) {
    res.status(500).json({ message: 'Seed error' });
  }
});

// 🔥 GET ALL PRODUCTS
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Fetch error' });
  }
});

// 🔥 GET SINGLE PRODUCT (VERY IMPORTANT FOR CART)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ EXPORT ROUTER
module.exports = router;