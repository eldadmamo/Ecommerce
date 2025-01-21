const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./utiles/db");

const socket = require('socket.io')
const http = require('http');
const { userInfo } = require("os");
const server = http.createServer(app)


app.use(cors({
    origin: ['http://localhost:5173','http://localhost:5174'],
    credentials: true
}))

const io = socket(server, {
    cors:{
        origin: '*',
        credentials: true
    }
})

var allCustomer = []

const addUser = (customerId,socketId,userInfo) => {
    const checkUser = allCustomer.some( u => u.customerId === customerId)
    if(!checkUser){
        allCustomer.push({
            customerId,
            socketId,
            userInfo
        })
    }
}

io.on('connection',(soc) => {
    console.log('socket server running..') 

    soc.on('add_user',(customerId, userInfo)=> {
        addUser(customerId, soc.id,userInfo)
        // console.log(allCustomer)  
    })
}) 

require('dotenv').config()


app.use(bodyParser.json())
app.use(cookieParser())


app.use('/api/home',require('./routes/home/homeRoutes'))
app.use('/api',require('./routes/authRoutes'))
app.use('/api',require('./routes/order/orderRoutes')) 
app.use('/api',require('./routes/dashboard/categoryRoute'))
app.use('/api',require('./routes/dashboard/productRoute'))
app.use('/api',require('./routes/dashboard/sellerRoutes'))
app.use('/api',require('./routes/home/customerAuthRoutes'))
app.use('/api',require('./routes/home/cardRoutes'))
app.use('/api',require('./routes/chatRoutes'))

app.get('/',(req,res) => res.send('Hello Server'))
const port = process.env.PORT;
dbConnect()

server.listen(port, ()=> {
    console.log(`Server ${port} is running`);
})