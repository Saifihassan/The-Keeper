const jwt = require('jsonwebtoken')

async function authMiddleware(req,res,next) {

    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
            message:"No token provided"
        })
    }

    try {
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        next()

    } catch (error) {
        return res.status(500).json({message:"Server error"})
    }
    
}


module.exports = authMiddleware