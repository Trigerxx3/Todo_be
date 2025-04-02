const mongoose = require('mongoose');

// Define the schema for todo items
const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    dueDate: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create and export the model
module.exports = mongoose.model('Task', todoSchema); 


