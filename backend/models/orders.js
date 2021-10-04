const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const ordersSchema = mongoose.Schema({

    nom: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,

    },
    prix: {
        type: Number,
        required: true,
        minlength: 3,
        maxlength: 4,
    },
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 44,

    },
    dateCreation:
        Date,  //  ca ce fais automatiquement 

    stars: {
        type: Number,
        required: true,
        maxlength: 1,
    },
    temps: {
        maxlength: 2,
        type: Number,

    },
    Extra: {
        type: String,
        minlength: 5,
        maxlength: 44,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurants',
        required: true,
    },
    format: {
        type: String,
        minlength: 2,
        maxlength: 44,
    }
})

// db.ordersSchema.getIndexes()


const OrdersModel = mongoose.model('lesPlats', ordersSchema)


module.exports = OrdersModel;