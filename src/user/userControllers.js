const { request } = require("express");
const jwt = require("jsonwebtoken");
const User = require('./userModel');


exports.login = async (request,response) => {
    try {
        const token = await jwt.sign({_id: request.user._id}, process.env.SECRET);
        response.send({user: request.user.username, token, text: "Succesfully logged in"});
    } catch (error) {
        console.log(error);
        response.send({error: error.message})
    }
};

exports.createUser = async (request, response) => {
    try {
        const newUser = await User.create(request.body);
        const token = await jwt.sign({_id: newUser,_id}, process.env.SECRET);
        response.status(201).send({msg: "createUser has created the following token", token});
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

exports.updateUser = async (request, response) => {
    try {
        const users = await User.updateOne(
            {username: request.body.username},
            {[request.body.key]: request.body.value});
        response.status(200).send({message: "Succesfully updated user"});
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
};

exports.deleteUser = async (request, response) => {
    try {
        console.log(request.query);
        await User.deleteOne({username: request.query.username});
        response.status(200).send({message: "user deleted"});
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message});
    }
}
