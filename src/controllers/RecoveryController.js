const User = require("../database/models/User");
const bcrypt = require("bcryptjs");

module.exports = {
    async findByEmail(req, res) {
        const { email } = req.query;

        try{
            const user = await User.findOne({email});
            return res.status(200).json({_id: user._id});
        }catch(err){
            return res.status(404).json({error: 'User not found!'});
        }
    },

    async resetPassword(req, res) {
        const { id } = req.query;
        const { senha } = req.body;
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(senha, salt);

        try{
            const user = await User.findByIdAndUpdate(id, {senha: hash});
            
            if(user){
                return res.status(200).json({message: 'OK'});
            }
            
            return res.status(404).json({error: 'Cannot to reset password!'});
        }catch(err) {
            if(err){
                return res.status(500).json({error: err});
            }
        }
    }
}