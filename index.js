const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://athuljaison005:athuljaison@cluster0.chwfgbs.mongodb.net/todoDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ Database connection error:", err));

// Routes
const itemRoutes = require("./routes/TodoRoutes");
app.use("/api/items", itemRoutes); // ✅ Ensure correct API route

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
