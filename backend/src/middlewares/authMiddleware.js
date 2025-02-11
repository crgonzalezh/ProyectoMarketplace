const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("Header recibido en middleware:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("Error: Token no proporcionado o mal formado");
        return res.status(400).json({ error: "Token no proporcionado o mal formado" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Token extraído:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token decodificado correctamente:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Error de validación JWT:", error);
        return res.status(401).json({ error: "Token inválido" });
    }
};

module.exports = authMiddleware;

