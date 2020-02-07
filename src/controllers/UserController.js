const User = require("../database/models/User");
const bcrypt = require("bcryptjs");
const JWTConfig = require("../config/JWTConfig");
require("dotenv/config");

module.exports = {
    async store(req, res){
        const {nome, email, senha} = req.body;

        try{
            const salt = await bcrypt.genSaltSync(process.env.SALT);
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
                return res.status(401).json({error: "User not found."});
            }

            const compare = await bcrypt.compareSync(senha, user.senha);
            if(compare == false){
                return res.status(401).json({error: "Invalid password."});
            }
            
            const token = await JWTConfig.generateToken(user._id);
            return res.json({token: token});
        }catch(err){
            console.log(err);
        }
    },

    async show(req, res) {
        const { token } = req.query;

        const id = await JWTConfig.decriptToken(token.split('Bearer ')[1]);

        if(id.name === 'TokenExpiredError'){
            return res.status(403).json({message: "Token is expired"});
        }

        const user = await User.findOne({_id: id}).select("-senha");
        return res.status(200).json(user);
    },

    async update(req, res) {
        const { token } = req.query;
        const { nome, email, dataNascimento, linkedin } = req.body;

        const id = await JWTConfig.decriptToken(token.split('Bearer ')[1]);

        if(id.name === 'TokenExpiredError'){
            return res.status(403).json({message: "Token is expired"});
        }

        const user = await User.findByIdAndUpdate({_id: id}, {nome, email, dataNascimento, linkedin});
        return res.status(200).json(user);
    },

    async uploadImageURL(req, res){
        const { token } = req.query;
        const { imageURL } = req.body;

        const id = await JWTConfig.decriptToken(token.split('Bearer ')[1]);

        if(id.name === 'TokenExpiredError'){
            return res.status(403).json({message: "Token is expired"});
        }

        try{
            const user = await User.findByIdAndUpdate({_id: id}, {imageURL: imageURL});

            if(user){
                return res.status(200).json({imageURL: user.imageURL});
            }
            
            return res.status(404).json({error: 'Cannot to upload an image  from url!'});
        }catch(err){
            if(err){
                return res.status(500).json({error: err});
            }
        }
        
    }
}