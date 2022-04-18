const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
});


const User = mongoose.model('User', userSchema);

async function getUsers() {
    return await User.find({}).exec(); 
}

async function createUser(email) {
    const user = new User();
    user._id = new mongoose.Types.ObjectId();
    user.email = email;

    return await user.save();
}

module.exports = {
    User,
    getUsers,
    createUser,
};