const express = require('express');
const { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const verifyToken = require('../middlewares/authMiddleware');

const router = express.Router();

// Obtener todos los pedidos de un usuario autenticado
router.get('/', verifyToken, getOrders);

// Obtener un pedido por ID
router.get('/:id', verifyToken, getOrderById);

// Crear un nuevo pedido
router.post('/', verifyToken, createOrder);

// Actualizar el estado de un pedido
router.put('/:id', verifyToken, updateOrderStatus);

// Eliminar un pedido
router.delete('/:id', verifyToken, deleteOrder);

module.exports = router;
