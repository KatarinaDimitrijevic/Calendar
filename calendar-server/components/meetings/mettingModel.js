const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    time: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    date: {
        type: mongoose.Schema.Types.String,
        required: true,
    },

    participants: {
        type: [mongoose.Schema.Types.String],
        required: true,
    },
});


const Meeting = mongoose.model('Meeting', meetingSchema);

async function getMeetings() {
    return await Meeting.find({}).exec();
}

async function createMeeting(title, description, time, date, participants) {
    const meeting = new Meeting();
    meeting._id = new mongoose.Types.ObjectId();
    meeting.title = title;
    meeting.description = description;
    meeting.time = time;
    meeting.date = date;
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

















