const express = require('express');
const workRouter = express.Router();
const db = require('./db.js');

// Work:
// id: string
// title: string
// description: string
// hours: number
// minionId: string


// Middleware function to generate newWork object for POST and PUT.
const createNewOrUpdatedWorkObj = (req, res, next) => {
    const newWork = {
        name: (req.body.name && req.body.name.toString()),
        title: (req.body.title && req.body.title.toString()),
        description: (req.body.description && req.body.description.toString()),
        hours: Number(req.body.hours),
        minionId: req.body.minionId.toString(),
    }
    req.body.id && (newWork.id = req.body.id.toString());
    req.newWork = newWork;
    next();
}

// Middleware to get minon-specific work array.
const getMinionWorkArr = (req, res, next) => {
    let minonWorkArr = db.getAllFromDatabase('work').filter(work => {
        return work.minionId == req.minion.id;
    })
    req.minonWorkArr = minonWorkArr;
    next();
}

// Middleware to search for instance of work with workId = 'workId' in the
// minion - specific work array, if it is there then to call next, if it is not
// there to return 400 'Bad Request', for DLETE and PUT requests.
const findWorkIdInMinionWorkArr = (req, res, next) => {
    if (req.minonWorkArr.
        findIndex(work => work.id === req.params.workId.toString()) + 1) {
        next();
    } else {
        res.status(400).send('Bad Request');
    }
};

// GET '/' to get an array of all work for the specified minon.
workRouter.get('/', getMinionWorkArr, (req, res, next) => {
    res.status(200).send(req.minonWorkArr);
});

// POST '/' to create a new work object and save it to the database.
workRouter.post('/', createNewOrUpdatedWorkObj, (req, res, next) => {
    res.status(201).send(db.addToDatabase('work', req.newWork));
});

// PUT '/:workId' to update a single work by id.
workRouter.put('/:workId', getMinionWorkArr, findWorkIdInMinionWorkArr,
    createNewOrUpdatedWorkObj, (req, res, next) => {
    res.status(200).send(db.updateInstanceInDatabase('work', req.newWork));
});

// DELETE '/:workId' to delete a single work by id.
workRouter.delete('/:workId', getMinionWorkArr, findWorkIdInMinionWorkArr,
    (req, res, next) => {
    res.status(204).send(db.deleteFromDatabasebyId('work', req.params.workId.toString()));
});


module.exports = workRouter;