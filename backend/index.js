const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Models/Todo");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todolist");

app.get("/", function (req, res) {
  res.send("hello");
});

app.post("/add", (req, res) => {
  const task = req.body.task;
  TodoModel.create({
    task: task,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

app.get("/todo", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

app.listen(8000, () => {
  console.log("server running");
});
