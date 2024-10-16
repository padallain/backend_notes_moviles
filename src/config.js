require('dotenv').config();

const DB_URI = process.env.DB_URI;
const PORT = process.env.PORT || 8000;
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = { DB_URI, PORT, SECRET_KEY };
