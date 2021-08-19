const router = require("express").Router();
const mongoose = require("mongoose")
const path = require("path")
const Workout = require("../models/workout.js");
//load homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});
//load stats page
router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
});
//load add workout page
router.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
})

module.exports = router