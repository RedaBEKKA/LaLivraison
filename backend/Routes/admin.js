const express = require('express') ; 
const router = express.Router() ; 

const controllers = require("../controllers/admin") ; 
const admin = require('../middleware/admin');


 router.post('/ajouter', admin ,controllers.ajouterCmd) ; 


module.exports = router ; 