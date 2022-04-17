const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: mongoose.Schema.Types.String,
        requored: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        requored: true,
    },
    time: {
        type: mongoose.Schema.Types.Date,
        requored: true,
    },
    participants: {
        type: [mongoose.Schema.Types.String],
        requored: true,
    },
});


const Meeting = mongoose.model('Meeting', meetingSchema);

async function getMeetings() {
    return await Meeting.find({}).exec();
}

async function createMeeting(title, description, time, participants) {
    const meeting = new Meeting();
    meeting._id = new mongoose.Types.ObjectId();
    meeting.title = title;
    meeting.description = description;
    meeting.time = time;
    meeting.participants = participants;

    return await meeting.save();
}


async function getMeetingById(id) {
    return await Meeting.findOne({_id: id}).exec();
}

async function deleteMeeting(id) {
    return await Meeting.deleteOne({_id: id}).exec();
}


module.exports = {
    Meeting,
    getMeetings,
    createMeeting,
    getMeetingById,
    deleteMeeting,
};

















