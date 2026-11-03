const express = require("express");
const router = express.Router();

const User = require("../models/User");

const {login, signup} = require("../controllers/Auth");
const {auth, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

// Testing protected routes for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected routes for TEST."
    })
})

// Protected Routes..
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected routes for Students."
    });
});

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to protected routes for Admin."
    });
});


// Not Required Just For General Knowledge..

// router.get("/getEmail", auth, async (req, res) => {

//     try{
//         const id = req.user.id;
//         console.log("ID: ", id);
        
//         const user = await User.findById(id);

//         res.status(200).json({
//             success: true,
//             user: user,
//             message: "Welcome to the Email Route."
//         });

//     } catch(error){
//         res.status(500).json({
//             success: false,
//             error: error.message,
//             message: "Internal Error."
//         });
//     }
// })

module.exports = router;