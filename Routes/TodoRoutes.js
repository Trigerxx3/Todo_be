const express = require("express");
const router = express.Router();
const Todo = require("../models/todoModel"); // Ensure this path and model exist

// ✅ GET all tasks
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (error) {
        console.error("❌ Error fetching tasks:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ POST - Add a new task
router.post("/", async (req, res) => {
    try {
        const { title, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: "Task title is required" });
        }

        const newTodo = new Todo({
            title: title.trim(),
            dueDate: dueDate || null,
            completed: false
        });

        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        console.error("❌ Error adding task:", error.message);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

// ✅ PUT - Update task by ID
router.put("/:id", async (req, res) => {
    try {
        const { title, completed, dueDate } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: "Task title is required" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                completed,
                dueDate
            },
            { new: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json(updatedTodo);
    } catch (error) {
        console.error("❌ Error updating task:", error.message);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

// ✅ DELETE - Remove task by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

        if (!deletedTodo) {
            return res.status(404).json({ error: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("❌ Error deleting task:", error.message);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

module.exports = router;
