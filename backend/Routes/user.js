const express = require('express') ; 
const router = express.Router() ; 
const {auth} = require('../middleware/auth')
const admin = require('../middleware/admin')

const userController = require("../controllers/user") ; 

router.post('/inscrire',userController.inscrireUser) ; 
router.post('/connexion',userController.authentifier)  ; 
router.post('/activation',userController.activateEmail)  ; 
router.post('/refreshtoken',userController.getAccessToken)  ; 
router.post('/forgot',userController.forgotPassword)  ; 
router.post('/reset',auth, userController.resetPassword ); 
router.get('/info', userController.getUserInfor )  ; 
router.get('/admininfo',[auth,admin], userController.getUsersAllInfor )  ; 
router.get('/deconnexion',[auth], userController.logout )  ; 
router.patch('/update', auth, userController.updateUser);
router.patch('/updaterole/:id', [auth,admin], userController.updateUsersRole);
router.delete('/delete/:id', [auth, admin], userController.deleteUser)




module.exports = router ; 