const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,
    },
    telephone: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255,
    }, 
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,
        trim: true,

        unique:true 
    },
    dateCreation:
        Date,  //  ca ce fais automatiquement 
    motDePasse: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin:{
        type:Boolean
    },role :{
        type :Number,
        default : 0,

    },avatar:{
        type :String,
        default : '',
    }},
    {
        timestamps:true,
    }
)
    
    


userSchema.methods.generateTokens = function () {
    const token = jwt.sign(
        {
            telephone: this.telephone, id: this._id, isAdmin:this.isAdmin,role:this.role,email:this.email,fullName:this.fullName,motDePasse:this.motDePasse
        },
        process.env.ACTIVATION_TOKEN_SECRET
        ,
        {
            expiresIn: "5m"
        });
    return token
}
userSchema.methods.generateRefreshTokens = function () {
    const token = jwt.sign(
        {
            telephone: this.telephone, id: this._id, isAdmin:this.isAdmin,role:this.role,email:this.email,fullName:this.fullName,motDePasse:this.motDePasse
        },
        process.env.ACTIVATION_TOKEN_SECRET
        ,
        {
            expiresIn: "7d"
        });
    return token
}

// userSchema.methods.findOneID = function ( ){

// }

const userModel = mongoose.model('Client', userSchema)


module.exports = userModel;