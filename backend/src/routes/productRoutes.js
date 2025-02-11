const express = require('express');
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener todos los productos
router.get('/', getProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Crear un nuevo producto (requiere autenticación)
router.post('/', verifyToken, createProduct);

// Actualizar un producto (requiere autenticación)
router.put('/:id', verifyToken, updateProduct);

// Eliminar un producto (requiere autenticación)
router.delete('/:id', verifyToken, deleteProduct);

module.exports = router;
