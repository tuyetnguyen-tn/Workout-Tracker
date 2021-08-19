const router = require("express").Router();
const mongoose = require("mongoose")
const Workout = require("../models/workout.js");
const mongojs = require('mongojs')
//route for creating a new workout
router.post("/workouts", ({ body }, res) => {
    const workout = new Workout(body);
    workout.totalTime();
    
    Workout.create(workout)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
//route for adding many workouts
router.post("/workouts/bulk", ({ body }, res) => {
    Workout.insertMany(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
//route for getting all workouts
router.get("/workouts", (req, res) => {
    Workout.find({})
        .sort({ day: 1 })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
//route for adding an exercise to a workout
router.put("/workouts/:id", (req, res) => {
    Workout.updateOne({
        _id: mongojs.ObjectId(req.params.id)
    }, {
            $push: {
            exercises: req.body,
            }
    })
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});
//route for the dashboard graphs
router.get("/workouts/range", async (req, res) => {
   //return two arrays with 7 entries, each a sum for that day
    Workout.aggregate([
    //allows access to nested values
        { $unwind: "$exercises" },
    //creates an object to fit the provided front end code
        {
            $group: {
                _id: "$day",
                day: { $push: { $max: "$day"}},
                totalDuration: { $sum: "$exercises.duration" },
                totalWeight: { $sum: "$exercises.weight"}
            }
        },
        {
    //this is a workaround to get the most recent 7 workouts. i'm sure there's a better way
            $sort: {_id: -1}
        },
        { $limit: 7 },
        {
            $sort: { _id: 1 }
        },
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
})

module.exports = router;
