# 🧪 Test Cases - E-Commerce Website

## 1. Backend API Tests (Manual + Automated)

### Manual API Tests (Postman/cURL)
Use base URL: `http://localhost:5000/api`

| Test ID | Endpoint | Method | Expected | Test Data | Status |
|---------|----------|--------|----------|-----------|--------|
| API-01 | `/products` | GET | 200, array products | - | |
| API-02 | `/products/seed` | GET | 200, 9 products seeded | Run once | |
| API-03 | `/products/:id` (valid) | GET | 200, product object | Use seeded ID | |
| API-04 | `/products/invalid` | GET | 404 | 123 | |
| API-05 | `/users/register` | POST | 201, user created | `{name:"Test",email:"test@test.com",password:"123"}` | |
| API-06 | `/users/login` | POST | 200, JWT token | `{email:"test@test.com",password:"123"}` | |
| API-07 | `/orders` | POST | 201, order created | Auth + cart data | |

**cURL Example (Seed):**
```bash
curl http://localhost:5000/api/products/seed
```

### Automated Tests (Jest + Supertest)
Setup in `backend/`:
```bash
npm install --save-dev jest supertest
```

Run: `npm test`

**products.test.js** covers:
- GET /products (happy/error)
- GET /:id (found/not found)
- /seed creates 9 products

## 2. Frontend UI Tests (Manual)

| Test ID | Page | Action | Expected |
|---------|------|--------|----------|
| UI-01 | index.html | Load | Landing page visible |
| UI-02 | products.html | Load products | 9 products displayed |
| UI-03 | Add to cart | Click button | Alert "Added to cart", localStorage updated |
| UI-04 | cart.html | Load | Cart items + totals |
| UI-05 | Update qty | Change input | Qty updates, total recalcs |
| UI-06 | Remove item | Click remove | Item gone, cart updates |
| UI-07 | checkout.html | Submit form | Order success alert, cart cleared |
| UI-08 | login/register | Auth flow | API calls succeed |

**Browser DevTools:**
- Console: No errors
- Network: 200 on all API calls
- localStorage: 'cart' array

## 3. End-to-End Tests

1. Seed → Browse → Add 2 items → Cart → Checkout (valid address)
2. Login → My orders → See placed order
3. Invalid: Empty cart checkout → Error
4. Invalid login → 401/400

## 4. Edge Cases
- Empty cart
- Product out of stock (countInStock:0)
- Invalid image src → fallback
- Network error → Graceful fail

## 5. Performance Tests
- Page load < 2s
- 100 products → No lag
- Cart 50 items → Smooth

## 📝 Test Execution Log
```
Date: YYYY-MM-DD
Tester: 
Coverage: Backend 80%, Frontend 100% manual
Bugs: 
Status: PASS/FAIL
```

---
*Update testcases.md after running tests*
