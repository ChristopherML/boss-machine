const express = require('express')
const ideasRouter = express.Router();
const db = require('./db.js');

ideasRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('ideas'));
});


module.exports = ideasRouter