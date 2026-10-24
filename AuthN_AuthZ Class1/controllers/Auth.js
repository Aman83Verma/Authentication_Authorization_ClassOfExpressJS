const bcrypt = require("bcrypt");
const User = require("../models/User");


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
            // hash(data, numberOfRounds, CallBack Fun) --> This helps to get the password hashed - data: Which data shouold be hashed, numberOfRounds: Ideal round to hash the data & CB optional if any function is required.
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
