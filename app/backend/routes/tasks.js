const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

// GET request to retrieve all tasks
router.get("/", (_req, res) => {
  // Read tasks from JSON file
  const tasksData = fs.readFileSync(
    path.join(__dirname, "../data/tasks.json"),
    "utf8"
  );
  const data = JSON.parse(tasksData);

  res.status(200).json(data);
});

// POST request to create a new task
router.post("/", (req, res) => {
  const { task, completed } = req.body;
  const newTask = {
    id: uuidv4(),
    task: task,
    completed: completed || false,
  };

  // Read tasks from JSON file
  const tasksData = fs.readFileSync(
    path.join(__dirname, "../data/tasks.json"),
    "utf8"
  );
  let tasksObj = JSON.parse(tasksData);
  console.log("tasksObj:", tasksObj);

  // Add new task to tasks array
  // Append new task to existing tasks
  let newTaskObj = {
    tasks: [...tasksObj.tasks, newTask],
  };
  console.log("newTaskObj:", newTaskObj);

  // Write updated tasks array to JSON file
  fs.writeFileSync(
    path.join(__dirname, "../data/tasks.json"),
    JSON.stringify(newTaskObj, null, 2)
  );

  res.status(201).json(newTask);
});

// UPDATE request to toggle checkboxes based on ID
router.put("/:taskId/completed", (req, res) => {
  const taskId = req.params.taskId;
  const { completed } = req.body;

  // Read tasks from JSON file
  const tasksData = fs.readFileSync(
    path.join(__dirname, "../data/tasks.json"),
    "utf8"
  );
  let tasksObj = JSON.parse(tasksData);

  // Find the index of the task with the given taskId
  const taskIndex = tasksObj.tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    // Task not found
    return res.status(404).json({ message: "Task not found" });
  }

  // Update the completed status of the task
  tasksObj.tasks[taskIndex].completed = completed;

  // Write updated tasks array to JSON file
  fs.writeFileSync(
    path.join(__dirname, "../data/tasks.json"),
    JSON.stringify(tasksObj, null, 2)
  );

  res.status(200).json({ message: "Task status updated successfully" });
});

// DELETE request to remove a task based on ID
router.delete("/:id", (req, res) => {
  const taskId = req.params.id;

  // Read tasks from JSON file
  const tasksData = fs.readFileSync(
    path.join(__dirname, "../data/tasks.json"),
    "utf8"
  );
  let tasks = JSON.parse(tasksData);

  // Find index of the task with the specified ID
  const taskIndex = tasks.tasks.findIndex((task) => task.id === taskId);

  // Check if the task was found
  if (taskIndex !== -1) {
    // Remove the task from the array
    tasks.tasks.splice(taskIndex, 1);

    // Write updated tasks array to JSON file
    fs.writeFileSync(
      path.join(__dirname, "../data/tasks.json"),
      JSON.stringify(tasks, null, 2)
    );

    res.status(200).json({ message: "Task deleted successfully" });
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

module.exports = router;
