const express = require("express");
const mongoose = require("mongoose")
const app = express();

const Task = require("./Task");
require("dotenv").config();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const {PORT, MONGO_URL} = process.env;

mongoose
  .connect(MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.log(err));

  /* const newTask = new Task({
    task: "Something",
    name: "Mahesh@Abeykoon",
  });
  newTask.save() */ 

app.post('/post', async (req, res) => { 
  const data = new Task({
      task: req.body.task,
      name: req.body.name
  })
  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave);
      // res.json();specifically used to send JSON responses & automatically sets the appropriate headers
      // res.send();is more flexible & can be used for various types of responses.
  }
  catch (error) {
      res.status(400).json({message: error.message});
  }
})

app.get("/getAll", async (req, res) =>{
  try {
    const data = await Task.find();
    res.status(200).send(data);
  }
  catch(error) {
    res.status(500).json({message: error.message});
  }
})

app.get("/task/:id", async (req, res) => {
  try{
    const task = await Task.findById(req.params.id);
    res.status(200).json(task);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
})

app.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await Task.findByIdAndUpdate(id, updatedData);
  
    res.status(200).json(result) 
}
catch (error) {
    res.status(400).json({ message: error.message });
}
})

app.delete("/delete/:id", async(req, res) => {
 
  try {
      const taskId = req.params.id;
      const deleteTask = await Task.findByIdAndDelete(taskId)
      res.status(200).json(deleteTask)
  }
  catch(error){
      res.status(500).json({message: error.message})
  }
})

app.listen(PORT, () => {
    console.log(`Server is Running on Port :${PORT}`);
})
