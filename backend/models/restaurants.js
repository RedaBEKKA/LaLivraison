const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { Double } = require('bson');

const restaurants = mongoose.Schema({
    nomRestaurant: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 44,
    },
    speciality: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,
    },
    address: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 144,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    lat: {
        type: Number,

    },
    lng: {
        type: Number,

    },
    dateCreation:
        Date,  //  ca ce fais automatiquement 
    registre: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
   
    tva: {
        type: String,
        default: 0,

    }, img: {
        type: String,
        default: '',
    },
    siteweb:{
        type: String,
        minlength: 5,
        maxlength: 1024,
    },
    email:{
        type: String,
        minlength: 5,
        maxlength: 44,
       
    }
},
    {
        timestamps: true,
    }
)

restaurants.methods.isRegistre = function () {
    maskNRC = /\d/, /\d/, ' ', /[a-zA-Z]{1}/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/,'-',/\d/,/\d/,'/',/\d/,/\d/;

    return maskNRC.test(registre);

}

const Restaurants = mongoose.model('Restaurants', restaurants)


module.exports = Restaurants;