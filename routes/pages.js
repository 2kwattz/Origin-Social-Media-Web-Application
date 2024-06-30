const nodemailer = require('nodemailer'); // For Verification OTP
const jwt = require('jsonwebtoken'); // User Authentication for Chat Application 
const cookieParser = require('cookie-parser');
const express = require('express'); // Express Framework
const app = express(); // Instance of Express
const path = require('path'); // Defines Static Path and Temp
const router = express.Router();
const bcrypt = require('bcrypt'); // For hashing password
const auth = require("../middleware/auth")

// Database Schemas


const RegisterUser = require("../src/models/registerUser")
app.use(cookieParser());

router.get("/", async function (req, res) {
    res.render("index");
})

router.get("/account/login", async function(req,res){
    res.render("account/login");
})

router.post("/account/login", async function(req,res){      
    console.log(req);
    const emailAddress = req.body.email;
    const password = req.body.password;

    try{
        const verifiedEmail = await RegisterUser.findOne({userEmail:emailAddress});
        
        if(verifiedEmail){
            const isMatch = bcrypt.compare(password,verifiedEmail.userPassword)

            if(isMatch){
                const token = await verifiedEmail.generateAuthtoken()
                console.log(`JWT Token Generated ${token}`)
                res.cookie("jwt", token,{
                    expires:new Date(Date.now()+9000000),
                    httpOnly: true
                })
                res.status(201).render("index"); 
            }
        }
        else{
            res.render("Credentials are not matching")
        }
        console.log(verifiedEmail)
    }
    catch(error){
        console.log(error)
        res.send("Invalid Email or password")
    }


})

router.get("/account/register", async function(req,res){
    res.render("account/register")
})

router.post("/account/register", async function(req,res){
    try{
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if(password===confirmPassword){

            const registerUserAccount = new RegisterUser({
                userFirstName: req.body.firstName,
                userLastName: req.body.lastName,
                userEmail: req.body.emailAddress,
                userPassword: password,
                userConfirmPassword: confirmPassword,
                userGender: req.body.gender,
                // userCity: req.body.city,
                // userState: req.body.state,
                // userCountry: req.body.country,
                // userSecurityQuestionAnswer: req.body.securityQuestionAnswer,
            })

            const registered = await registerUserAccount.save()

            if(registered){
                res.status(201).render("index")
            }
            else{
                res.send("Registering Error")
            }
        }
        else{
            res.send("Passwords Do Not Match")

        }
    }
    catch(error){
        console.log(error)
    }
})

router.get("/writeblog", async function(req,res){
    res.render("/blog/writeblog");
})

router.post("/writeblog", async function(req,res){
    const blogTitle = req.body.blogTitle;
    res.render("/blog/writeblog");s

    
})

// Authentication Routes

// Logout
router.get("/logout", auth, async function(req,res){
    try{
        res.clearCookie("jwt")
        console.log("Logout Successfull")
        await req.user.save()
        res.render("account/login")
    }
    catch (error){
        res.status(500).send(error)
    }

})

module.exports = router;