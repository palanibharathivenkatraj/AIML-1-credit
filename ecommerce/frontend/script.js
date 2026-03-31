const API_BASE = window.location.host.includes('localhost')
    ? 'http://localhost:5000/api'
    : 'https://aiml-1-credit.onrender.com/api';

// 🔥 CART STORAGE
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 🔥 ADD TO CART
function addToCart(productId) {
    const item = cart.find((i) => i.productId === productId);

    if (item) {
        item.qty += 1;
    } else {
        cart.push({ productId, qty: 1 });
    }

    saveCart();
    alert('Added to cart ✅');
}

// 🔥 UPDATE QTY
function updateQty(productId, qty) {
    const item = cart.find((i) => i.productId === productId);
    if (!item) return;

    item.qty = Math.max(1, qty);
    saveCart();
    loadCart();
}

// 🔥 REMOVE ITEM
function removeFromCart(productId) {
    cart = cart.filter((i) => i.productId !== productId);
    saveCart();
    loadCart();
}

// 🔥 PRODUCTS
let allProducts = [];

async function loadProducts() {
    try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        allProducts = data;
        displayProducts(data);
    } catch (err) {
        console.error(err);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products-container');
    if (!container) return;

    container.innerHTML = '';

    products.forEach((product) => {
        container.innerHTML += `
        <div class="product">
            <img src="${product.image}" 
                 onerror="this.src='images/default.jpg'">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>₹${product.price}</p>
            <button onclick="addToCart('${product._id}')">Add to Cart</button>
        </div>
        `;
    });
}

// 🔥 LOAD CART
async function loadCart() {
    const container = document.getElementById('cart-container');
    if (!container) return;

    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = '<p>Your cart is empty</p>';
        return;
    }

    let total = 0;

    for (const item of cart) {
        const res = await fetch(`${API_BASE}/products/${item.productId}`);
        const product = await res.json();

        const subtotal = product.price * item.qty;
        total += subtotal;

        container.innerHTML += `
        <div class="cart-item">
            <img src="${product.image}">
            <h4>${product.name}</h4>
            <p>₹${product.price}</p>
            <input type="number" value="${item.qty}" min="1"
              onchange="updateQty('${item.productId}', this.value)">
            <p>Total: ₹${subtotal}</p>
            <button onclick="removeFromCart('${item.productId}')">Remove</button>
        </div>
        `;
    }

    container.innerHTML += `<h3>Total: ₹${total}</h3>`;
}

// 🔥 GO TO CHECKOUT
function goToCheckout() {
    window.location.href = 'checkout.html';
}

// 🔥 GET CART DETAILS
async function getProductDetailsFromCart() {
    return Promise.all(
        cart.map(async (item) => {
            const res = await fetch(`${API_BASE}/products/${item.productId}`);
            const product = await res.json();

            return {
                product: product._id,
                name: product.name,
                qty: item.qty,
                price: product.price
            };
        })
    );
}

// 🔥 CHECKOUT LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checkout-form');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const orderItems = await getProductDetailsFromCart();

            const total = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);

            const orderData = {
                orderItems,
                shippingAddress: {
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    postalCode: document.getElementById('postalCode').value,
                    country: document.getElementById('country').value,
                },
                paymentMethod: document.getElementById('paymentMethod').value,
                itemsPrice: total,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: total,
            };

            try {
                const res = await fetch(`${API_BASE}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                await res.json();

                alert('Order placed successfully 🎉');

                localStorage.removeItem('cart');
                window.location.href = 'products.html';

            } catch (err) {
                console.error(err);
                alert('Order failed ❌');
            }
        });
    }
});

// 🔥 AUTH FUNCTIONS
async function registerUser(name, email, password) {
    try {
        const res = await fetch(`${API_BASE}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            alert('Registered! Welcome ' + data.name);
            window.location.href = 'products.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

async function loginUser(email, password) {
    try {
        const res = await fetch(`${API_BASE}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            alert('Logged in! Welcome back ' + data.name);
            window.location.href = 'products.html';
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
}

// 🔥 AUTH FORM HANDLERS
document.addEventListener('DOMContentLoaded', () => {
    // Existing checkout
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const orderItems = await getProductDetailsFromCart();
            const total = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
            const token = localStorage.getItem('token');
            if (!token) return alert('Please login first');

            const orderData = {
                orderItems,
                shippingAddress: {
                    address: document.getElementById('address').value,
                    city: document.getElementById('city').value,
                    postalCode: document.getElementById('postalCode').value,
                    country: document.getElementById('country').value,
                },
                paymentMethod: document.getElementById('paymentMethod').value,
                itemsPrice: total,
                taxPrice: 0,
                shippingPrice: 0,
                totalPrice: total,
            };

            try {
                const res = await fetch(`${API_BASE}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(orderData)
                });

                if (res.ok) {
                    alert('Order placed! 🎉');
                    localStorage.removeItem('cart');
                    window.location.href = 'products.html';
                } else {
                    alert('Order failed');
                }
            } catch (err) {
                alert('Error: ' + err.message);
            }
        });
    }

    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            loginUser(email, password);
        });
    }

    // Register form
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            registerUser(name, email, password);
        });
    }

    // Page load
    if (window.location.pathname.includes('products.html')) {
        loadProducts();
    }

    if (window.location.pathname.includes('cart.html')) {
        loadCart();
    }
});
