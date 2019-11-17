const express = require("express");
const cors = require("cors");
const api = express();

require("./database/Connection");

const route = require("./routes");

const PORT = 3030;

api.use(cors());
api.use(express.json());
api.use(route);

api.listen(PORT, () => {
    console.log("Server is running...");
});