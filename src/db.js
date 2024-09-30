const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    // Conecta a MongoDB usando la URI
    await mongoose.connect('mongodb+srv://padallain2000:7gnah-y.5ZPpAG.@notescluster.t4h3p.mongodb.net/?retryWrites=true&w=majority&appName=notesCluster', {
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
