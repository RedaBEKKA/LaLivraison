require("dotenv").config();
require('express-async-errors');

const express = require('express') ; 
const cors = require('cors') ;
var cookieParser = require('cookie-parser')
const mongoose = require('mongoose') ; 
const routeruser = require('./Routes/user') ; 
const routeradmin = require('./Routes/admin') ; 
const { auth } = require('./middleware/auth');

//const messages = require('./twilio') ; 

const app = new express() ; 
app.use(express.json())
app.use(cors()) ; 
app.use(cookieParser())


// app.use(bodyParser.json({limit:'30mb' , extended:true}) ) ;
// app.use(bodyParser.urlencoded({limit:'30mb'  , extended:true}) ) ;

const PORT = process.env.PORT || 5000  ; 


mongoose.connect( process.env.MONGODB_URL,  { useCreateIndex: true, useUnifiedTopology: true ,useNewUrlParser: true ,useFindAndModify: false }  ,(err)=>{
    app.listen(PORT,(req,res)=>{console.log('listning to PORT:',PORT)}) ; 
} ,);

 // les routes

app.use('/user', routeruser) ; 
app.use('/admin', routeradmin) ; 

app.use( (req,res)=>{
    res.json({"error" :"error 404"}) ; 
})

