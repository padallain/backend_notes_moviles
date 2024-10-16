const mongoose = require('mongoose');
const { DB_URI } = require('./config');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

// Exporta la función connectToDatabase
module.exports = { connectToDatabase };
