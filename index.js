

const express = require("express");


const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect("mongodb+srv://athuljaison005:athuljaison@cluster0.chwfgbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
}).then(() => console.log(" Connected to MongoDB"))
  .catch(err => console.error(" Database connection error:", err));

 const itemRoutes = require("./Routes/TodoRoutes");
 app.use("/itemRoutes",itemRoutes );

// Start server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});