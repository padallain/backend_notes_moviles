const mongoose = require('mongoose');
const { DB_URI, PORT, SECRET_KEY } = require('./config');

const connectToDatabase = async () => {
    try {
        // Conecta a MongoDB usando la URI desde config.js
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Establece un tiempo de espera de 5 segundos
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = { connectToDatabase };
