const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const register = async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await pool.query(
            'INSERT INTO Usuarios (nombre, correo, password) VALUES ($1, $2, $3) RETURNING *',
            [nombre, correo, hashedPassword]
        );

        res.json({ message: 'Usuario registrado', user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        const user = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [correo]);

        if (user.rows.length === 0) return res.status(400).json({ message: 'Correo no registrado' });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.rows[0].idUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login };
