const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel"); // Updated import

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new task
router.post("/", async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.data) {
            return res.status(400).json({ message: "Task data is required" });
        }

        const newTodo = new Todo({
            data: req.body.data,
            completed: false,
            dueDate: req.body.dueDate || null
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        console.error("Error saving task:", err);
        res.status(400).json({ message: err.message });
    }
});

// PUT (Update task)
router.put("/:id", async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { 
                completed: req.body.completed,
                data: req.body.data,
                dueDate: req.body.dueDate 
            },
            { new: true }
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE task
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router; // ✅ Correct export
