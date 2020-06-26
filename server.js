const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000;

const db = require("./models");


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// routes

app.get("/", (request, response) => {
    response.sendFile(path.join(__dirname + "/public/index.html"));
  });

  app.get("/exercise", (request, response) => {
    response.sendFile(path.join(__dirname + "/public/exercise.html"));
  });  

  app.get("/stats", (request, response) => {
    response.sendFile(path.join(__dirname + "/public/stats.html"));
  });

  app.get("/api/workouts", (request, response) => {
    db.Workout.find({})
      .then(dbWorkout => {
          console.log(dbWorkout)
        response.json(dbWorkout);
      })
      .catch(error => {
        response.json(error);
      });
  });
  
  app.post("/api/workouts", ({ body }, response) => {
    db.Workout.create(body)
      .then(dbWorkout => {
        response.json(dbWorkout);
      })
      .catch(error => {
        response.json(error);
      });
  });

  app.put("/api/workouts/:id", (request, response) => {
    db.Workout.findByIdAndUpdate(
      request.params.id,
      { $push: { exercises: request.body } },
      { new: true, runValidators: true }
    )
      .then(dbWorkout => {
        response.json(dbWorkout);
      })
      .catch(error => {
        response.json(error);
      });
  });

  app.get("/api/workouts/range", (request, response) => {
    db.Workout.find()
  
      .limit(7)
      .then(dbWorkout => {
        response.json(dbWorkout);
      })
      .catch(error => {
        response.json(error);
      });
  });

  // Start the server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });







