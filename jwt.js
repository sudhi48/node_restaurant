const jwt=require('jsonwebtoken');

const jwtAuthMiddleware= (req, res, next) => {
    //first check the request header authorization or not
    const authoriztion=req.headers.authorization
    if(!authoriztion){
        return res.status(401).json({error: 'Token not found'})
    }


    //Extract the jwt token from the request header
    const token=req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({error: 'Unauthorized'})
    }
    
    try {
        //Verify the JWT token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //Attach user info to the request object
        req.user=decoded;
        next();
    } catch (error) {
     console.log(error);
     res.status(401).json({error: 'Invalid token'})   
    }
}

//function to generate token

const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn: 30000})
}

module.exports = {jwtAuthMiddleware, generateToken};