const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const minionRouter = require('./apiMinion')
const ideasRouter = require('./apiIdeas')
const meetingsRouter = require('./apiMeetings')

// MINIONS ROUTER
apiRouter.use('/minions', minionRouter)
// IDEAS ROUTER
apiRouter.use('/ideas', ideasRouter)
//MEETINGS ROUTER
apiRouter.use('/meetings', meetingsRouter)

// GET /api/minions to get an array of all minions.


// Middleware (USE) /api/minions/:minionId 1.validate existence of the minion, 2. if exists, find the index of the minion in the database, 3. then to attach the index location to the request object
//apiRouter.param('minionId', )

//apiRouter.param('minionId', (req, res, next, minionId) => {

//});

// GET /api/minions/:minionId to get a single minion by id.
// PUT /api/minions/:minionId to update a single minion by id.
//  DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = apiRouter;
