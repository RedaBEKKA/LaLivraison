const express = require('express') ; 
const router = express.Router() ; 

const adminController = require("../controllers/admin") ; 
const {auth} = require('../middleware/auth')
const admin = require('../middleware/admin')
// les plats 
 router.post('/addOrders', [auth,admin] ,adminController.ajouterOrders) ; 
 router.get('/orderInfo' ,[auth,admin],adminController.getAllOrders) ; 
 router.get(`/orderInfo/:id` ,[auth,admin],adminController.getOneOrder) ; 
 router.delete(`/deleteOrder/:id` ,[auth,admin],adminController.deleteOrder) ; 
 router.patch(`/updateOrder/:id` ,[auth,admin],adminController.updateOrder) ; 

//  Restaurants
 router.post('/newRestaurant' ,[auth,admin],adminController.ajouterResto) ; 
 router.get('/restaurantsInfo' ,[auth,admin],adminController.getAllRestaurants) ; 
 router.get(`/restaurantInfo/:id` ,[auth,admin],adminController.getOneRestaurant) ; 
 router.delete(`/deleteRestaurant/:id` ,[auth,admin],adminController.deleteRestaurent) ; 
 router.patch(`/updateRestaurant/:id` ,[auth,admin],adminController.updateRestaurent) ; 


module.exports = router ; 