const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    data: { type: String },
    Date: { type: Date },
   
});
module.exports = mongoose.model("Todo", todoSchema);
console.log("Todo Schema Created"); 
console.log("Todo Model Exported");