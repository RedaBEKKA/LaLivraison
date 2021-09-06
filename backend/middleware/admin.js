const  userModel  = require('../models/schemaUser')

const authAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findOne(req.user.role)
        console.log(user)
        if(user.role !== 1) 
            return res.status(500).json({msg: "Accès aux ressources d'administration refusé."})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }


}

module.exports = authAdmin
