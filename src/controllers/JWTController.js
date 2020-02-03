const JWTConfig = require("../config/JWTConfig");

module.exports = {
    async isTokenValideted(req, res) {
        const { token } = req.query;

        const id = await JWTConfig.decriptToken(token.split('Bearer ')[1]);
        if(id.name === 'TokenExpiredError') {
            return res.status(401).json({message: "Token is expired"});
        }

        res.status(200).json({token});
    }
}