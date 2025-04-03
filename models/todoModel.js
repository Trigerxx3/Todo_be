const mongoose = require('mongoose');

// Define the schema for todo items
const TodoSchema = new mongoose.Schema({
    data: {
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
module.exports = mongoose.model('Todo', TodoSchema); 


