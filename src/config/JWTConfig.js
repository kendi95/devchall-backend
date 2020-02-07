require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_JWT;

module.exports = {
    async generateToken(userId){
        const token = await 'Bearer '+jwt.sign({id: userId}, secret, {
            expiresIn: process.env.EXPIRATION
        });
        return token;
    },

    async decriptToken(token){
        try{
            const {id} = await jwt.verify(token, secret);
            return id;
        }catch(err){
            return err;
        }
    }
}