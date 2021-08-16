const mongoose = require('mongoose')  ; 

const userSchema = mongoose.Schema({
    fullName : {type:String , required:true } , 
    telephone :{type:String , required:true ,unique : true,}  , 
    dateCreation : Date  ,  //  ca ce fais automatiquement 
    motDePasse : {type:String , required:true}    , 
})

const userModel = mongoose.model('Client'  , userSchema)


module.exports = userModel ; 