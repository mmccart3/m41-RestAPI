const { response } = require('express');
const User = require('./userModel');

exports.createUser = async (request, response) => {
    try {
        const newUser = await User.create(request.body);
        response.status(201).send({user: newUser});
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
};

exports.listUsers = async (request, response) => {
    try {
        const users = await User.find({});
        const usernames = users.map((u) => {
            return u.username;
        })
        response.status(200).send({users: usernames});
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
};

// Theoretical login:
// ------------------
// exports.login= async (request, response) => {
//     try {
//         const user = await User.findOne({username: req.body.username, password: req.body.password})
//     } catch (error) {
//         console.log(error)
//     }
// }


