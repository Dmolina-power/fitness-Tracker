const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//creating workout schema

const WorkoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now()
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Type of Exercise"
        },
        name: {
          type: String,
          trim: true,
          required: "Exercise Name"
        },
        duration: {
          type: Number,
          required: "Exercise duration in minutes"
        },
        weight: {
          type: Number
        },
        reps: {
          type: Number
        },
        sets: {
          type: Number
        },
        distance: {
          type: Number
        }
      }
    ]
  },
  
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;