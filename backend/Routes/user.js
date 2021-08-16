const express = require('express') ; 
const router = express.Router() ; 

const controllers = require("../controllers/user") ; 




router.post('/sign',controllers.inscrireUser) ; 
router.post('/auth',controllers.authentifier)  ; 






module.exports = router ; 