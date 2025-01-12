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

app.use('/api/home',require('./routes/home/homeRoutes'))
app.use('/api',require('./routes/authRoutes'))
app.use('/api',require('./routes/dashboard/categoryRoute'))
app.use('/api',require('./routes/dashboard/productRoute'))
app.use('/api',require('./routes/dashboard/sellerRoutes'))
app.use('/api',require('./routes/home/customerAuthRoutes'))
app.use('/api',require('./routes/home/cardRoutes'))

app.get('/',(req,res) => res.send('Hello Server'))
const port = process.env.PORT;
dbConnect()


app.listen(port, ()=> {
    console.log(`Server ${port} is running`);
})