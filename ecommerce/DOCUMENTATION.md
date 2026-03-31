# E-Commerce Website - Complete Documentation

## 📋 Overview
A full-stack e-commerce platform for browsing products (boys/girls clothing), managing shopping cart, user authentication, and order placement. Built for demo/learning purposes with realistic features.

**Key Features:**
- ✅ Product catalog with images/descriptions/prices
- ✅ Shopping cart (localStorage persistence)
- ✅ User registration/login (JWT auth)
- ✅ Checkout & order creation
- ✅ Admin seed data for demo products
- ✅ Responsive design (basic CSS)

## 🛠️ Tech Stack
```
Backend: Node.js + Express + MongoDB (Mongoose)
Frontend: Vanilla HTML/CSS/JavaScript
Database: MongoDB (localhost:27017/ecommerce)
Auth: JWT + bcrypt
Other: cors, dotenv
```

## 🏗️ Project Structure
```
ecommerce/
├── backend/
│   ├── server.js          # Main Express server (port 5000)
│   ├── models/            # Mongoose schemas (Product, User, Order)
│   ├── routes/            # API routes
│   ├── middleware/        # auth.js (protect routes)
│   └── package.json       # npm start/dev
├── frontend/
│   ├── index.html         # Landing
│   ├── products.html      # Catalog
│   ├── cart.html          # Cart view
│   ├── checkout.html      # Order form
│   ├── login.html         # Auth
│   ├── register.html      # Auth
│   ├── script.js          # Core JS (cart, API calls)
│   ├── style.css          # Styling
│   └── images/            # Product photos (served by backend)
└── README.md              # Quick start
```

## 🗄️ Database Models

### Product
```js
{
  name: String,
  description: String,
  price: Number,
  image: String (e.g. 'images/tshirt.jpg'),
  category: String ('Boys'|'Girls'),
  countInStock: Number
}
```

### User
```js
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Order
```js
{
  user: ObjectId (ref User),
  orderItems: [{
    product: ObjectId (ref Product),
    name: String,
    qty: Number,
    price: Number
  }],
  shippingAddress: {
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentMethod: String,
  itemsPrice: Number,
  taxPrice: Number (0),
  shippingPrice: Number (0),
  totalPrice: Number
}
```

## 🌐 API Endpoints (Base: http://localhost:5000/api)

| Method | Endpoint              | Auth | Description                  |
|--------|-----------------------|------|------------------------------|
| GET    | `/products`           | -    | List all products            |
| GET    | `/products/:id`       | -    | Single product details       |
| GET    | `/products/seed`      | -    | **Seed 9 demo products**     |
| POST   | `/users/register`     | -    | Create user account          |
| POST   | `/users/login`        | -    | Login (returns JWT)          |
| GET    | `/users/profile`      | ✅    | User profile                 |
| POST   | `/orders`             | ✅    | Create order from cart       |
| GET    | `/orders/:id`         | ✅    | Order details                |
| PUT    | `/orders/:id/pay`     | ✅    | Mark order as paid           |
| GET    | `/orders/myorders`    | ✅    | User's orders list           |
| GET    | `/images/*`           | -    | Serve product images         |

**Auth Header:** `Authorization: Bearer <jwt_token>`

## 🎨 Frontend Flow
1. **index.html** → Landing → products.html
2. **products.html** → Browse/Add to cart → cart.html
3. **cart.html** → View cart → checkout.html
4. **checkout.html** → Fill shipping → POST /orders
5. **login/register.html** → Auth before checkout/profile

**Client-side State:** Cart in localStorage (`[{productId, qty}]`)

## 🚀 Setup & Run

### Prerequisites
- Node.js (v18+)
- MongoDB (local: `mongod --dbpath ./data` or MongoDB Atlas)
- `.env` (optional):
  ```
  PORT=5000
  MONGO_URI=mongodb://localhost:27017/ecommerce
  JWT_SECRET=your-secret-key
  ```

### 1. Backend
```bash
cd ecommerce/backend
npm install
npm run dev  # or npm start
```
- Seed: Visit `http://localhost:5000/api/products/seed`
- Test API: `http://localhost:5000/api/products`

### 2. Frontend
```bash
cd ecommerce/frontend
# Option 1: Live Server (VSCode ext)
# Option 2: Python
python -m http.server 3000
# Option 3: Node http-server (npm i -g http-server)
http-server -p 3000
```
Open `http://localhost:3000`

### Terminal Output
```
🚀 Server running on port 5000
MongoDB connected
```

## 🧪 Testing / Demo
1. Seed products
2. Browse products → Add to cart
3. Register/login
4. Checkout → Verify order in MongoDB
5. Check `/api/orders/myorders`

**Sample Products:** 9 clothing items (T-shirt, Dress, Gown, Jacket, Jeans, Hoodie, Skirt, Shorts, Cardigan)

## 📱 Screenshots
*(Add screenshots of products page, cart, checkout)*

## ⚠️ Limitations & Improvements
- No real payments (add Stripe/PayPal)
- Basic validation (add Joi/Zod)
- No file uploads (products images hardcoded)
- No admin dashboard
- Add search/filter by category
- Image optimization/CDN
- Email notifications
- Pagination for products

## 🚀 Deployment
1. Backend: Render/Vercel/Heroku + MongoDB Atlas
2. Frontend: Netlify/Vercel (static hosting)
3. Update API_BASE to production URL
4. Set env vars

## 🔗 Related Files
- Models: `backend/models/*.js`
- Full source code inline comments (🔥 important notes)

---
*Generated by BLACKBOXAI - Last updated: $(date)*
