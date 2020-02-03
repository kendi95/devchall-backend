const mongoose = require("mongoose");

const USER = "";
const PASSWORD = "";

const connection = mongoose.connect(
    `mongodb+srv://${USER}:${PASSWORD}@cluster0-ehkhi.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err) => {
    if(err){
        console.log(`Error to connect with database, ${err}`);
    } else {
        console.log("Successful to connect with database.");
    }
});

module.exports = connection;