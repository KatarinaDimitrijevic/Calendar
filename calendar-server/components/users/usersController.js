const User = require('./usersModel');

module.exports.getUsers = async function(req, res, next) {
    try{
        const users = await User.getUsers();
        res.status(200).json(users);

    }catch(err){
        next(err);
    }
};


module.exports.createUser = async function(req, res, next) {
    const email = req.body.email;
    
    try{
        if(email === ''){
            const error = new Error('Email field must not be empty!');
            error.status(400);
            throw error;
        }

        const user = await User.createUser(email);
        res.status(200).json(user);

    }catch(err){
        next(err);
    }
};