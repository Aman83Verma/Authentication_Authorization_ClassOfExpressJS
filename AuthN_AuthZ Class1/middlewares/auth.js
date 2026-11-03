// auth, isStudent, isAdmin

const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try{
        // Extracting JWt Token
        const token = req.body.token || req.cokkies.token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is Missing."
            })
        }

        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;

        } catch(error){
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            })
        }
        next();

    } catch(error){
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while verifying the token"
        })
    }
}


exports.isStudent = (req, res, next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is the protected Route for Students."
            });
        }
        next();

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching."
        })
    }
}