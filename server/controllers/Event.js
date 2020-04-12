const Event = require('../models/Event');

export const createNewEvent = (req, res, next) => {
    //should be modified to use mongoose
    const result = Event.save();
    if(result) {
        res.redirect('/');
    }
};
