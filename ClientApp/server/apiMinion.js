const express = require('express')
const minionRouter = express.Router();
const db = require('./db.js');

minionRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('minions'));
});

// POST /api/minions to create a new minion and save it to the database.
minionRouter.post('/', (req, res, next) => {
    const newMinion = {
        name: req.body.name.toString(),
        title: req.body.title.toString(),
        weaknesses: req.body.weaknesses.toString(),
        salary: Number(req.body.salary),
    };
    res.send(db.addToDatabase('minions', newMinion));
})

module.exports = minionRouter