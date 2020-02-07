const express = require("express");
const cors = require("cors");
const api = express();

require("./database/Connection");

const route = require("./routes");

api.use(cors());
api.use(express.json());
api.use(route);

const port = process.env.PORT;

api.listen(port, () => {    
    console.log(`Server is running in the port ${port}`);
});