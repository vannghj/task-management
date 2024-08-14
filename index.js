const express = require("express");
require("dotenv").config()
const database = require("./config/database");
database.connect();

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

//route
routesApiVer1(app);
//route
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});
