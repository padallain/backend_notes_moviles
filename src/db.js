const mongoose = require('mongoose');
const { DB_URI, DB_URI_LOCAL } = require('./config');

const connectToDatabase = async () => {
    const databaseURI = process.env.NODE_ENV === 'production' ? DB_URI : DB_URI_LOCAL;

    try {
        // Conecta a la base de datos (producción o local)
        await mongoose.connect(databaseURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Establece un tiempo de espera de 5 segundos
        });
        console.log(`Connected to MongoDB: ${process.env.NODE_ENV === 'production' ? 'Production' : 'Local'}`);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = { connectToDatabase };
