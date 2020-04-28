const checkMillionDollarIdea = (req, res, next) => {

    const newIdea = {
        name: (req.body.name && req.body.name.toString()) ,
        description: (req.body.description && req.body.description.toString()),
        weeklyRevenue: (req.body.weeklyRevenue &&
            req.body.weeklyRevenue.toString()),
        numWeeks: Number(req.body.numWeeks),
    };

    if (Number(newIdea.weeklyRevenue) * newIdea.numWeeks >= 1000000) {
        // Conditional logic to attach the ID property to the newIdea object only
        // where it is required, for PUT http requests.
        req.body.id && (newIdea.id = req.body.id.toString());
        req.newIdea = newIdea;
        next();
    } else {
        res.status(400).send('Bad Request');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
