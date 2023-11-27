const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
// Defining the task schema
const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    assignedUser: {
        type: ObjectId,
        ref: "userModel"
    },
    dueDate: {
        type: Date,
        required: true
    },
    completionStatus: {
        type: String,
        required: true
    }
}, { timestamps: true });


let model=mongoose.model("taskModel", taskSchema);
module.exports=model;