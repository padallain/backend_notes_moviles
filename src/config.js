// config.js
require('dotenv').config();

module.exports = {
    DB_URI: process.env.DB_URI,
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY,
};
