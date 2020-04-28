const express = require('express')
const minionRouter = express.Router();
const db = require('./db.js');


// GET /api/minions to get an array of all minions.
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
    res.status(201).send(db.addToDatabase('minions', newMinion));
})

// Middleware function to: 1. determine if idea exists; 
//   |--2. if exists, to continue to the next midleware; 
//   |--3. if does not exist, to return error code 404 Not Found.
minionRouter.param('minionId', (req, res, next, minionId) => {
    req.minion = db.getFromDatabaseById('minions', minionId.toString());
    req.minion ? next() : res.status(404).send('Minion Not Found');
});

// GET /api/minions/:minionId to get a single minion by id.
minionRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(req.minion);
});

// PUT /api/minions/:minionId to update a single minion by id.
minionRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = {
        id: req.minion.id.toString(),
        name: req.body.name.toString(),
        title: req.body.title.toString(),
        weaknesses: req.body.weaknesses.toString(),
        salary: Number(req.body.salary),
    };
    res.status(200).send(db.updateInstanceInDatabase('minions', updatedMinion));
});

//  DELETE /api/minions/:minionId to delete a single minion by id.
minionRouter.delete('/:minionId', (req, res, next) => {
    res.status(204).send(db.deleteFromDatabasebyId('minions', req.minion.id.toString()));
})

module.exports = minionRouter

