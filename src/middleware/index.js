const bcrypt = require("bcryptjs");
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