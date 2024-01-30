// src/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import * as productController from '../controllers/productController.js';

// Create a new product
router.post('/products', productController.createProduct);

// Get all products
router.get('/products', productController.getProducts);

// Get a specific product by ID
router.get('/products/:id', productController.getProductById);

// Search products by name, description, or variant name
router.get('/products/search', productController.getProducts);

// Update a specific product by ID
router.put('/products/:id', productController.updateProduct);

// Delete a specific product by ID
router.delete('/products/:id', productController.deleteProduct);


export default router;
