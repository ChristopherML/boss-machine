const checkMillionDollarIdea = (req, res, next) => {
    const newIdea = {
        name: ( req.body.name && req.body.name.toString()) ,
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

// You will create a custom middleware function checkMillionDollarIdea that will
// come in handy in some '/api/ideas' routes.Write this function in the 
// 'server/checkMillionDollarIdea.js' file.This function will make sure that any
// new or updated ideas are still worth at least one million dollars! The total
// value of an idea is the product of its numWeeks and weeklyRevenue properties.

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
