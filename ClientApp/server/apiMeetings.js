const express = require('express')
const meetingsRouter = express.Router();
const db = require('./db.js');

meetingsRouter.get('/', (req, res, next) => {
    res.send(db.getAllFromDatabase('meetings'));
});

module.exports = meetingsRouter