const pool = require('../config/db');

const getOrders = async (req, res) => {
    try {
        const { idUsuario } = req.user; 

        const result = await pool.query('SELECT * FROM Pedidos WHERE idUsuario = $1', [idUsuario]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const { idUsuario } = req.user;

        const result = await pool.query('SELECT * FROM Pedidos WHERE idPedido = $1 AND idUsuario = $2', [id, idUsuario]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const { idUsuario } = req.user;
        const { precioTotal } = req.body;

        const result = await pool.query(
            'INSERT INTO Pedidos (idUsuario, precioTotal, estado, fechaCrea) VALUES ($1, $2, $3, NOW()) RETURNING *',
            [idUsuario, precioTotal, 'Pendiente']
        );

        res.json({ message: 'Pedido creado', order: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;

        const result = await pool.query(
            'UPDATE Pedidos SET estado = $1 WHERE idPedido = $2 RETURNING *',
            [estado, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });

        res.json({ message: 'Pedido actualizado', order: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM Pedidos WHERE idPedido = $1 RETURNING *', [id]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Pedido no encontrado' });

        res.json({ message: 'Pedido eliminado', order: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getOrders, getOrderById, createOrder, updateOrderStatus, deleteOrder };
