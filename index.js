const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./Routes/TodoRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://athuljaison005:athuljaison@cluster0.chwfgbs.mongodb.net/todoapp?retryWrites=true&w=majority")
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Routes
app.use("/api/items", todoRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
