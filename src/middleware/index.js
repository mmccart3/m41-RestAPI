const bcrypt = require("bcryptjs");

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