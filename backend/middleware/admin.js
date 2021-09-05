const  userModel  = require('../models/schemaUser')

module.exports = function  async(req,res,next){

 if (req.userModel.isAdmin){
     console.log(req.userModel.isAdmin)
     return res.status(403).send("not admin")
 }
 next()
}




