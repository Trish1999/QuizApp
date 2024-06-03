const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

    try {
        const headerToken = req.headers["authorization"];
        
        if (!headerToken) {
            return res.status(501).json({message:"unauthorized access"})
        }
        const decode = jwt.verify(headerToken, process.env.SECRET_KEY);
        req.userId = decode.userId;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ errorMessage: "Invalid token!" })
    }
};
module.exports = verifyToken ;
