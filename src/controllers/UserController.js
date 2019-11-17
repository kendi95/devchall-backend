const User = require("../database/models/User");
const bcrypt = require("bcryptjs");
const JWTConfig = require("../config/JWTConfig");

module.exports = {
    async store(req, res){
        const {nome, email, senha} = req.body;

        try{
            const salt = await bcrypt.genSaltSync(10);
            const hash = await bcrypt.hashSync(senha, salt);

            const user = await User.create({
                nome, email, senha: hash
            });

            const token = await JWTConfig.generateToken(user._id);
            return res.json({token: token});
        }catch(err){
            console.log(err);
        }
        
    },

    async index(req, res){
        const {email, senha} = req.body;

        try{
            const user = await User.findOne({email});
            if(!user){
                return res.status(404).json({error: "User not found."});
            }

            const compare = await bcrypt.compareSync(senha, user.senha);
            if(compare == false){
                return res.status(404).json({error: "Invalid password."});
            }
            
            const token = await JWTConfig.generateToken(user._id);
            return res.json({token: token});
        }catch(err){
            console.log(err);
        }
    }
}