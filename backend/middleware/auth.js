const jwt = require('jsonwebtoken');

//wants to like a post 
//clicks the like button => auth middlewar (next )=>like controller 

const auth = async (req, res, next) => {
    try {


        const token = req.header('x-access-token')
        if (!token) return res.status(400).json({ msg: "Invalid token Authentication." })

        console.log(token)
      
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
            if (err) return res.status(400).json({ msg: "  non valide user ." })

            req.user = user
            next()
        })
    } catch (error) {
        console.log(error);
    }

}



module.exports.auth = auth;