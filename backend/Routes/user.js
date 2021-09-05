const express = require('express') ; 
const router = express.Router() ; 
const {auth} = require('../middleware/auth')

const userController = require("../controllers/user") ; 

router.post('/sign',userController.inscrireUser) ; 
router.post('/auth',userController.authentifier)  ; 
router.post('/activation',userController.activateEmail)  ; 
router.post('/refresh_token',userController.getAccessToken)  ; 
router.post('/forgot',userController.forgotPassword)  ; 
router.post('/reset', userController.resetPassword )  ; 
router.get('/info', userController.getUserInfor )  ; 






module.exports = router ; 