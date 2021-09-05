const jwt = require('jsonwebtoken') ;

//wants to like a post 
//clicks the like button => auth middlewar (next )=>like controller 

const auth = async(req,res,next)=>{
    // try {
        
    //  const token = req.headers.authorization.split("")[1] ; // oui c'est 1

    //    const token = req.header('x-access-token')
     //const isCustomAuh = token.length <500 ;  // pour savoir quelle type de d'authentification si c plus de 500 alors c google auth 

    //  let decodeData  ; 

    //  if(token){
    //      decodeData = jwt.verify(token , 'test') ; ;
    //      req.userId = decodeData?.id ;  // why ? 
    //  } else {
    //      decodeData = jwt.decode(token) ;  // si on utilise googleAuth  ,JE SUIS PAS INTERESSé
    //      req.userId = decodeData?.sub ; 
    //  }

    // } catch (error) {
    //     console.log(error) ; 
    // }


    try {
        const token = req.header('x-access-token')
         if(!token) return res.status(400).json({msg: "Invalid token Authentication."})
            console.log(`token`, token)
         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
             if(err) return res.status(400).json({msg: "Invalid Authentication."})

             req.user = user
             next()
         })
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}


// module.exports = auth

module.exports.auth = auth ; 