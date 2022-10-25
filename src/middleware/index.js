const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/userModel");

exports.hashPass = async (request,response, next) => {
    try {
        const pass = request.body.password;
        const hashedPass = await bcrypt.hash(pass,8);
        request.body.password = hashedPass;
        next();
        // moves onto the next function
    } catch (error) {
        console.log(error);
        response.send({error: error.message});
    }
};

exports.comparePass = async (request,response, next) => {
    try {
        request.user = await User.findOne({username: request.body.username});
        if (request.user &&
            await bcrypt.compare(request.body.password, request.user.password
            )) {
            next()
        } else {
            throw new Error('Incorrect password or user id')
        }
    } catch (error) {
        console.log(error);
        response.send({error: error.message})
        
    }
}

exports.tokenCheck = async (request, response, next) => {
    try {
        // get the token from req, unlock the token, find the user id and then send the user to a controller
        const token = request.header("Authorization");
        const decodedToken = await jwt.verify(token, process.env.SECRET);
        const user = await User.findById(decodedToken._id);
        request.user = user;
        next();
    } catch (error) {
        console.log(error);
        response.status(500).send({error: error.message})
    }
}