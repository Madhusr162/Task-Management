const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const taskModel = mongoose.model("taskModel");
const userModel = mongoose.model("userModel");
const protectedRoute = require('../Middleware/protectedResource');

// To get all the tasks from the database
router.get("/tasks", (req, res) => {
    taskModel.find().sort({ createdAt: 'desc' })//fetching it in the descending order
        .then((dbTasks) => {
            res.status(200).json({ tasks: dbTasks })//retriving the tasks
        })
        .catch((error) => {
            console.log(error);
        })
})

// To get the tasks created in last 7 days
router.get("/filterTask", async (req,res)=>{
    try{
        // Calculate the date 7 days ago
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Query for tasks that were created in the last 7 days
    const query = { createdAt: { $gte: sevenDaysAgo } };

    const result = await taskModel.find(query).exec();
    res.json({tasks: result});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})
// Getting the task with its ID
router.get("/tasks/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskModel.findById(id);
        if (!task) {//checking whether task exist
            return res.status(404).json({ success: false, message: "Task not found" })
        }
        // returning the success response
        return res.status(200).json({ success: true, task: task });
    } catch (error) {//returning the error if any
        console.error('Error fetching tweet details:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
})

// To create a new task
router.post("/createTask", protectedRoute, async (req, res) => {
    if (!req.user || !req.user._id) {
        return res.status(401).json({ error: "User id not found" });
    }
    const adminOrNot = await userModel.findById(req.user._id);

    if (!adminOrNot) {
        return res.status(404).json({ error: `User not found with this id ${req.user._id}` });
    }
    // checks whether the user is admin or not
    const adminValue = adminOrNot.admin;
    console.log(adminValue);

    if (adminValue === "true") {// if the user is admin
        const { title, description, assignedUser, dueDate, completionStatus } = req.body
        if (!title || !description || !assignedUser || !dueDate || !completionStatus) {//checking whether content is filled
            return res.status(400).json({ error: "one or more mandatory field is missing" });
        } else {
            const task = new taskModel({//creating new task 
                title,
                description,
                assignedUser,
                dueDate,
                completionStatus
            });
            task.save()//saving the task
                .then((dbTask) => {
                    res.status(201).json({ success: true, task: dbTask });//returning the task status with its value
                })
                .catch((error) => {//catch the error and consoling it
                    console.error(error);
                    res.status(500).json({ success: false, message: 'Internal server error' });
                });
        }
    }
    else {
        return res.status(401).json({ error: "you are not allowed to add the task" })
    }
});

// to update the task
router.put("/task/:id/update", protectedRoute, async (req, res) => {
    const adminOrNot = await userModel.findById(req.user._id);
    const taskIdToUpdate = req.params.id;
    console.log(taskIdToUpdate);

    if (!adminOrNot) {
        return res.status(404).json({ error: `User not found with this id ${req.user._id}` });
    }
    // checks whether the user is admin or not
    const adminValue = adminOrNot.admin;
    console.log(adminValue);

    if (adminValue === "true") {
        try {
            if (taskIdToUpdate) {
                const { title, description, assignedUser, dueDate, completionStatus } = req.body
                if (!title || !description || !assignedUser || !dueDate || !completionStatus) {//checking whether content is filled
                    return res.status(400).json({ error: "one or more mandatory field is missing" });
                } else {
                    await taskModel.findByIdAndUpdate(taskIdToUpdate, { title, description, assignedUser, dueDate, completionStatus });
                    res.status(201).json({ result: "Details updated" });
                }
            } else {
                return res.status(404).json({ error: `Task with this ${taskIdToUpdate} not found` })
            }

        } catch (error) {
            console.error('Error updating task details:', error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    else {
        return res.status(401).json({ error: "you are not allowed to update the task" })
    }

})

// to delete the task
router.delete("/task/:id/delete", protectedRoute, async (req, res) => {
    const adminOrNot = await userModel.findById(req.user._id);
    const task = await taskModel.findById(req.params.id);

    if (!adminOrNot) {
        return res.status(404).json({ error: `User not found with this id ${req.user._id}` });
    }
// checks whether the user is admin or not
    const adminValue = adminOrNot.admin;
    console.log(adminValue);

    if (adminValue === "true") {//if the user is admin
        if (!task) {
            return res.status(404).json({ error: `product not found with this id ${req.params.id}` })
        }
        // delete the product
        await task.deleteOne();
        res.status(200).json({
            success: true,
            message: "task deleted successfully"
        })
    }
    else {
        return res.status(401).json({ error: "you are not allowed to delete the task" })
    }
})
module.exports = router;