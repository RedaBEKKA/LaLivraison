const express = require('express') ; 
const router = express.Router() ; 

const adminController = require("../controllers/admin") ; 
const {auth} = require('../middleware/auth')
const admin = require('../middleware/admin')

 router.post('/ajouter', admin ,adminController.ajouterCmd) ; 
 router.post('/newRestaurant' ,[auth,admin],adminController.ajouterResto) ; 
 router.get('/restaurantsInfo' ,[auth,admin],adminController.getAllRestaurants) ; 
 router.get(`/restaurantInfo/:id` ,[auth,admin],adminController.getOneRestaurant) ; 


module.exports = router ; 