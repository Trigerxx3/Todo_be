const express = require("express");
const router = express.Router();
const Task = require("../models/todoModel"); // Ensure correct model import

// GET All Tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error fetching tasks" });
  }
});

// ADD a New Task
router.post("/", async (req, res) => {
  try {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Task content is required" });

    const newTask = new Task({ text: data, completed: false });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Server error adding task" });
  }
});

// DELETE Task by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`🟡 Deleting task with ID: ${id}`); // Debugging

    const deletedTask = await Task.findByIdAndDelete(id); // ✅ Correct MongoDB ID lookup
    if (!deletedTask) {
        console.error("❌ Task not found for ID:", id); // Debugging log for missing task
    }

    if (!deletedTask) {
        console.error("❌ Task not found for ID:", id); // Debugging log for missing task
    }


    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" }); // ✅ Handle non-existing task
    }

    console.log("✅ Task deleted:", deletedTask); // Debugging
    res.status(200).json({ message: "Task deleted successfully", deletedTask });

  } catch (error) {
    console.error("❌ Error deleting task:", error);
    res.status(500).json({ error: "Server error during deletion", details: error.message }); // More specific error message

    res.status(500).json({ error: "Server error during deletion", details: error.message }); // More specific error message

    res.status(500).json({ error: "Server error" });
  }
});

// EDIT Task by ID
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    if (!data) return res.status(400).json({ error: "Updated task text is required" });

    const updatedTask = await Task.findByIdAndUpdate(id, { text: data }, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Server error updating task" });
  }
});
