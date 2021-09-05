const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const ordersSchema = mongoose.Schema({
    titre: {
        type: String,
        required: true,
        unique:true,
        minlength: 5,
        maxlength: 44,
    },
    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,
        unique:false,

    },
    type:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,
        unique:false,

    },
    dateCreation:
        Date,  //  ca ce fais automatiquement 
    prix: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 4,
    },
    stars:{
        type: Number,
        required: true,
        maxlength: 1,
    },
    temps:{
        maxlength: 2,
        type: Number,

    }
})

const OrdersModel = mongoose.model('Commandes', ordersSchema)


module.exports = OrdersModel;