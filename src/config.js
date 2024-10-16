require('dotenv').config();

const DB_URI = process.env.DB_URI;
const mongoose = require('mongoose');

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

module.exports = { connectToDatabase };
