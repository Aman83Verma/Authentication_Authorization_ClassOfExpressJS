const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Signup Routes Handler
exports.signup = async (req, res) => {
    try{
        // Getting the data
        const {name, email, password, role} = req.body;

        // Checking the User email exists or not
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User Already Exists."
            })
        }

        // Securing the Password.
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
            // hash(data, numberOfRounds, CallBack Fun) --> This helps to get the password hashed - data: Which data shouold be hashed, numberOfRounds: Ideal round to hash the data & CB Func optional if any function is required.
        }
        catch(error){
            return res.status(400).json({
                success: false,
                message: "Error in Hashing Password."
            })
        }

        // Creting Entry for User.
        const user = await User.create({name, email, password:hashedPassword, role})

        return res.status(200).json({
            success: true,
            message: "User Created Successfully."
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, Please try again later."
        })
    }
}


// Loginup Routes Handler
exports.login = async (req, res) => {
    try{

        // Fetching the datas
        const {email, password} = req.body;

        // Validate it that email and password is given by EndUser or not
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Please! enter the details carefully."
            })
        }

        // Check the registered User
        const user = await User.findOne({email});

        // if not register the return
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not register"
            })
        }

        let payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }
        // verify the password and generate the JWT tokens
        // We use "compare function" to compare two password to check they are similar or not.
        if(await bcrypt.compare(password, user.password)){ 
            // Password Match
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"});
            console.log(user);
            
            
            // This will help to define the value in user object not in database
            user.token = token;
            console.log(user);

            // This will help to undefine the password value in user object not in database to get security from hacker.
            user.password = undefined;
            console.log(user);

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            // This function cookie help to get the signIn AuthN for about 3 days.
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged Successfully"
            });

        }
        else{
            return res.status(403).json({
                success: false,
                message: "Incorrect Password."
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Loggin failure"
        })
    }
}