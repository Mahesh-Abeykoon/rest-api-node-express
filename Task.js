const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    task: {
        type: String
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model("Task", taskSchema);