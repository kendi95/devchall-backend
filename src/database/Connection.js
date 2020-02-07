const mongoose = require("mongoose");
require("dotenv/config");

const connection = mongoose.connect(
    process.env.URL_CONNECTION, {
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