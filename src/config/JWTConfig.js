const jwt = require("jsonwebtoken");
const secret = "";

module.exports = {
    async generateToken(userId){
        const token = await 'Bearer '+jwt.sign({id: userId}, secret, {
            expiresIn: 300
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