const express = require('express')
const ideasRouter = express.Router();
const db = require('./db.js');
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

// GET '/' to get an array of all ideas.
ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
});

// POST '/' to create a new idea and save it to the database.
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    res.status(201).send(db.addToDatabase('ideas', req.newIdea));
});

// Middleware function to: 1. determine if idea exists; 
//   |--2. if exists, to continue to the next midleware; 
//   |--3. if does not exist, to return error code 404 Not Found.
ideasRouter.param('ideaId', (req, res, next, ideaId) => {
    req.idea = db.getFromDatabaseById('ideas', ideaId.toString());
    req.idea ? next() : res.status(404).send('Idea Not Found');
});

// GET '/:ideaId' to get a single idea by id.
ideasRouter.get('/:ideaId', (req, res, next) => {
    res.status(200).send(req.idea);
    console.log(req.idea)
});

// PUT '/:ideaId' to update a single idea by id.
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    res.status(200).send(db.updateInstanceInDatabase('ideas', req.newIdea));
});

// DELETE '/:ideaId' to delete a single idea by id.
ideasRouter.delete('/:ideaId', (req, res, next) => {
    db.deleteFromDatabasebyId('ideas', req.idea.id.toString());
    res.status(204).send('Deleted');
});

// Takes the model name argument and a second string argument representing the
// unique ID of the element to delete.Returns true if the delete occurs properly
// and false if the element is not found.

module.exports = ideasRouter