const mongoose = require('mongoose'); 
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');



const tripsAddTrip = async(req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newTrip.save();

        if(!q)
        {
            return res
                .status(400)
                .json(err);
        } else {
            return res
                .status(201)
                .json(q);
        }




}




// GET: /trips - lists all the trips
// Regardless of outcome, respnse must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // Return single record
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.long(q);


    if(!q) { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};


// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, respnse must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single record
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.long(q);


    if(!q) { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

const tripsUpdateTrip = async (req, res) => {
    const q = await Model.findOneAndUpdate(
        { 'code': req.params.tripCode },
        req.body,
        { new: true }
    ).exec();

    if (!q) {
        return res
            .status(404)
            .json({ message: "Trip not found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};