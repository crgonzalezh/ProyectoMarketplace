const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async (nombre, correo, password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await pool.query(
        'INSERT INTO Usuarios (nombre, correo, password, fechaCrea) VALUES ($1, $2, $3, NOW()) RETURNING *',
        [nombre, correo, hashedPassword]
    );
    return result.rows[0];
};

const getUserByEmail = async (correo) => {
    const result = await pool.query('SELECT * FROM Usuarios WHERE correo = $1', [correo]);
    return result.rows[0];
};

const getUserById = async (idUsuario) => {
    const result = await pool.query('SELECT * FROM Usuarios WHERE idUsuario = $1', [idUsuario]);
    return result.rows[0];
};

const deleteUser = async (idUsuario) => {
    const result = await pool.query('DELETE FROM Usuarios WHERE idUsuario = $1 RETURNING *', [idUsuario]);
    return result.rows[0];
};

module.exports = { createUser, getUserByEmail, getUserById, deleteUser };
