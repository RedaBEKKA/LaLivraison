const express = require('express') ; 
const cors = require('cors') ;
const bodyParser = require('body-parser') ; 
const mongoose = require('mongoose') ; 

const routeruser = require('./Routes/user') ; 


const messages = require('./twilio') ; 

const app = new express() ; 


app.use(bodyParser.json({limit:'30mb' , extended:true}) ) ;
app.use(bodyParser.urlencoded({limit:'30mb'  , extended:true}) ) ;
app.use(cors()) ; 
const PORT = process.env.PORT || 5000  ; 


mongoose.connect('mongodb://localhost:27017/livraisonDb',  { useUnifiedTopology: true ,useNewUrlParser: true  }  ,(err)=>{
    app.listen(PORT,(req,res)=>{console.log('listning to PORT:',PORT)}) ; 
} ,);

 // les routes je ferai quoi ? 

app.use('/user', routeruser) ; 

app.use( (req,res)=>{
    res.json({"error" :"error 404"}) ; 
})

