const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Note schema
const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
      trim: true,     // Removes excess whitespace
    },
    description: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,  // Associate the note with a user
      ref: 'User',                           // Reference the User model
      required: true,
    },
    category: {
      type: String,
      trim: true,
      default: 'General',                    // Default category if none provided
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],       // Priority can be one of these values
      default: 'Low',
    },
    favorite: {
      type: Boolean,
      default: false,                        // Option to mark a note as favorite
    },
    card: {
      type: Number,
        min: 1,
        max: 20,
        required: true                       // Make it required if necessary
    },
    createdAt: {
      type: Date,
      default: Date.now,                     // Set the default creation date
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,  // Automatically manage `createdAt` and `updatedAt` fields
  }
);

// Create and export the Note model
module.exports = mongoose.model('Note', noteSchema);