const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const Product = require('../models/Product');

describe('Products API', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce_test');
    });

    afterAll(async () => {
        await mongoose.connection.db.dropDatabase();
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Product.deleteMany({});
    });

    describe('GET /api/products', () => {
        it('should return all products', async () => {
            const product = new Product({
                name: 'Test Product',
                price: 100,
                description: 'Test desc',
                image: 'test.jpg',
                category: 'Test',
                countInStock: 10
            });
            await product.save();

            const res = await request(app)
                .get('/api/products')
                .expect(200);

            expect(res.body).toHaveLength(1);
            expect(res.body[0].name).toBe('Test Product');
        });

        it('should return 500 on error', async () => {
            const mockError = jest.spyOn(Product, 'find').mockRejectedValue(new Error('Test error'));

            const res = await request(app)
                .get('/api/products')
                .expect(500);

            expect(res.body.message).toBe('Fetch error');
            mockError.mockRestore();
        });
    });

    describe('GET /api/products/:id', () => {
        it('should return product by id', async () => {
            const product = await Product.create({
                name: 'Test Product',
                price: 100
            });

            const res = await request(app)
                .get(`/api/products/${product._id}`)
                .expect(200);

            expect(res.body.name).toBe('Test Product');
        });

        it('should return 404 if not found', async () => {
            const res = await request(app)
                .get('/api/products/123')
                .expect(404);

            expect(res.body.message).toBe('Product not found');
        });
    });

    describe('GET /api/products/seed', () => {
        it('should seed products', async () => {
            const res = await request(app)
                .get('/api/products/seed')
                .expect(200);

            expect(res.body.length).toBe(9);
            expect(res.body[0].name).toBe('Boys Graphic T-Shirt');
        });
    });
});
