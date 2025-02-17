const pool = require('../config/db');

const getProducts = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM productos WHERE idProducto = $1', [id]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, idCategoria, idUsuario } = req.body;

        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, idCategoria, idUsuario, fechaCrea) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING *',
            [nombre, descripcion, precio, stock, idCategoria, idUsuario]
        );

        res.json({ message: 'Producto creado', product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, stock } = req.body;

        const result = await pool.query(
            'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE idProducto = $5 RETURNING *',
            [nombre, descripcion, precio, stock, id]
        );

        if (result.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json({ message: 'Producto actualizado', product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM productos WHERE idProducto = $1 RETURNING *', [id]);

        if (result.rows.length === 0) return res.status(404).json({ message: 'Producto no encontrado' });

        res.json({ message: 'Producto eliminado', product: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
