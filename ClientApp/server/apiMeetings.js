const express = require('express')
const meetingsRouter = express.Router();
const db = require('./db.js');

// GET '/' to get an array of all meetings.
meetingsRouter.get('/', (req, res, next) => {
    res.status(200).send(db.getAllFromDatabase('meetings'));
});

// POST '/' to create a new meeting and save it to the database.
meetingsRouter.post('/', (req, res, next) => {
    res.status(201).send(db.addToDatabase('meetings', db.createMeeting()));
});

// DELETE '/' to delete all meetings from the database.
meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(db.deleteAllFromDatabase('meetings'));
});

module.exports = meetingsRouter