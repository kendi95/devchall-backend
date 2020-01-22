const mongoose = require("mongoose");

const User = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    senha: {
        type: String,
        required: true
    },
    dataNascimento: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('User', User);