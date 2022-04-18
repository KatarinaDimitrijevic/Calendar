const Meeting = require('./mettingModel');

module.exports.getMeetings = async function(req, res, next) {
    try{
        const meetings = await Meeting.getMeetings();
        res.status(200).json(meetings);
    }catch(err){
        next(err);
    }
};


module.exports.createMeeting = async function(req, res, next) {
    const title = req.body.title;
    const description = req.body.description;
    const time = req.body.time;
    const date = req.body.date;
    const participants = req.body.participants;
    
    try{

        if(title === '' || description === '' || time === '' || date === '' || participants.length === 0){
            const error = new Error("Validation failed! All values are required!");
            error.status = 400;
            throw error;
        }

        const meeting = await Meeting.createMeeting(title, description, time, date, participants);
        res.status(200).json(meeting);

    }catch(err){
        next(err);
    }
};


module.exports.getMeetingById = async function(req, res, next) {
    const id = req.params.id;

    try{
        const meeting = await Meeting.getMeetingById(id);

        if(meeting === null){
            const error = new Error(`Meeting with id: ${id} does not exist!`);
            error.status(404);
            throw error;
        }
        res.status(200).json(meeting);

    }catch(err){
        next(err);
    }
};



module.exports.deleteMeeting = async function(req, res, next) {
    const id = req.params.id;

    try{
        const meeting = await Meeting.getMeetingById(id);

        if(meeting === null){
            const error = new Error(`Meeting with id: ${id} does not exist!`);
            error.status(404);
            throw error;
        }
        else {
            await Meeting.deleteMeeting(meeting);
            res.status(200).json({message: "Successfully deleted!"});
        }

    }catch(err){
        next(err);
    }
}

















