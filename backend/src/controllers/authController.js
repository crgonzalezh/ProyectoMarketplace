const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Asegúrate de que `db.js` exporte correctamente la conexión a PostgreSQL

const secretKey = process.env.JWT_SECRET || 'secretoSuperSeguro';

// 🔹 Registro de usuario
exports.register = async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body); // <-- Este log debe estar dentro de la función

    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        // 🔹 Verificar si el usuario ya existe
        const userExists = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "El usuario ya está registrado" });
        }

        // 🔹 Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🔹 Insertar usuario en la base de datos
        const newUser = await pool.query(
            "INSERT INTO usuarios (nombre, correo, password, fecha_crea) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [nombre, correo, hashedPassword]
        );

        res.status(201).json({ message: "Usuario registrado con éxito", user: newUser.rows[0] });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// 🔹 Inicio de sesión
exports.login = async (req, res) => {
    console.log("Intentando iniciar sesión con:", req.body); // <-- Agregar log para depurar

    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    try {
        // 🔹 Buscar el usuario en la base de datos
        const userResult = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const user = userResult.rows[0];

        // 🔹 Comparar la contraseña hasheada
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        // 🔹 Generar token JWT
        const token = jwt.sign({ id_usuario: user.id_usuario, correo: user.correo }, secretKey, {
            expiresIn: "1h",
        });

        res.json({ message: "Inicio de sesión exitoso", token, user });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};
