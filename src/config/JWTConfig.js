const jwt = require("jsonwebtoken");
const secret = "";

module.exports = {
    generateToken(userId){
        const token = 'Bearer '+jwt.sign({id: userId}, secret, {
            expiresIn: 300
        });
        return token;
    }
}