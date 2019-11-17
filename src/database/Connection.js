const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://<user>:<password>@cluster0-ehkhi.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err){
        console.log("Error to connect with database.");
    } else {
        console.log("Successful to connect with database.");
    }
});

module.exports = connection;