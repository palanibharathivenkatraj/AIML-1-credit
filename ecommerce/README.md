
# E-Commerce Website

A full-stack e-commerce website built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- User registration and login
- Product catalog
- Shopping cart
- Checkout process
- Order management

## Setup

1. Install MongoDB and start it on localhost:27017.

2. Navigate to the backend directory:
   ```
   cd ecommerce/backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Start the backend server:
   ```
   npm start
   ```

5. Open the frontend by serving the HTML files. You can use a simple HTTP server:
   ```
   cd ecommerce/frontend
   python -m http.server 3000
   ```

6. Open your browser and go to `http://localhost:3000`.

## API Endpoints

- `/api/products` - Get all products
- `/api/products/seed` - Seed demo products with pictures
- `/api/users/register` - Register user
- `/api/users/login` - Login user
- `/api/orders` - Create order

## Notes

- This is a basic implementation. In a real application, add more security, validation, and error handling.
- For payment, integrate with actual payment gateways like PayPal or Stripe.
- Images are assumed to be URLs; in production, use a file upload service.