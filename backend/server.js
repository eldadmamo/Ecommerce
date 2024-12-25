const express = require("express");
const app = express();
require('dotenv').config()

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utiles/db");

app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use(bodyParser.json())

app.use(cookieParser())

app.use('/api',require('./routes/authRoutes'))

const port = process.env.PORT;
dbConnect()


app.listen(port, ()=> {
    console.log(`Server ${port} is running`);
})