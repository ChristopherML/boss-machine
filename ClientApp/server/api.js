const express = require('express');
const apiRouter = express.Router();
const db = require('./db.js');
const minionRouter = require('./apiMinions')
const ideasRouter = require('./apiIdeas')
const meetingsRouter = require('./apiMeetings')

// MINIONS ROUTER
apiRouter.use('/minions', minionRouter)
// IDEAS ROUTER
apiRouter.use('/ideas', ideasRouter)
//MEETINGS ROUTER
apiRouter.use('/meetings', meetingsRouter)


module.exports = apiRouter;
