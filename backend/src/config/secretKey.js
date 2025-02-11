require('dotenv').config();

const secretKey = process.env.JWT_SECRET || 'default_secret_key';

module.exports = secretKey;
