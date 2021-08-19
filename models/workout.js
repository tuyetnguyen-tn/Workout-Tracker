const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    totalDuration: {
        type: Number,
        default: 0,
    },
    exercises: [{

        name: {
            type: String,
            trim: true,
            required: "Enter a name for an exercise"
        },
        type: {
            type: String,
            trim: true,
            required: "Enter a workout type"
        },
        weight: {
            type: Number,
        },
        sets: {
            type: Number,
        },
        reps: {
            type: Number,
        },
        duration: {
            type: Number,
        },
        distance: {
            type: Number,
        }
    }],
});

workoutSchema.methods.totalTime = function () {
    
    for (let i = 0; i < this.exercises.length; i++){
        this.totalDuration += this.exercises[i].duration;
    }
    return this.totalDuration
}

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;