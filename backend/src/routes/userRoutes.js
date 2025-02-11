const express = require('express');
const router = express.Router();

// Ejemplo de una ruta
router.get('/', (req, res) => {
    res.send('Ruta de usuarios funcionando');
});

module.exports = router;
