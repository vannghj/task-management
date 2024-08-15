const express = require("express");
const cors = require("cors");
require("dotenv").config()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const database = require("./config/database");
database.connect();

const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json())
app.use(cookieParser());
//route
routesApiVer1(app);
//route
app.listen(port, ()=>{
    console.log(`app listening on port ${port}`);
});
