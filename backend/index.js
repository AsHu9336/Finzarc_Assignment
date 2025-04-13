const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = "tasks.json";
const USERS_FILE = "users.json";
console.log(DATA_FILE + " " + USERS_FILE);
function readData(file) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(file));
}

function writeData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Auth: Simple Login (no hashed passwords for quick development)
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = readData(USERS_FILE);
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ success: true, username });
  else res.status(401).json({ success: false });
});

// Add Task
app.post("/tasks", (req, res) => {
  const { username, title } = req.body;
  const tasks = readData(DATA_FILE);
  const newTask = { id: Date.now(), username, title, completed: false };
  tasks.push(newTask);
  writeData(DATA_FILE, tasks);
  res.json(newTask);
});

// Get Tasks
app.get("/tasks", (req, res) => {
  const { username } = req.query;
  const tasks = readData(DATA_FILE).filter(task => task.username === username);
  res.json(tasks);
});

// Complete Task
app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const tasks = readData(DATA_FILE);
  const task = tasks.find(t => t.id == id);
  if (task) {
    task.completed = true;
    writeData(DATA_FILE, tasks);
    res.json(task);
  } else res.status(404).json({ error: "Task not found" });
});

// Delete Task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  let tasks = readData(DATA_FILE);
  tasks = tasks.filter(t => t.id != id);
  writeData(DATA_FILE, tasks);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
