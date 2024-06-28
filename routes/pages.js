const nodemailer = require('nodemailer'); // For Verification OTP
const jwt = require('jsonwebtoken'); // User Authentication for Chat Application 
const cookieParser = require('cookie-parser');
const express = require('express'); // Express Framework
const app = express(); // Instance of Express
const path = require('path'); // Defines Static Path and Temp
const router = express.Router();

app.use(cookieParser());

router.get("/", async function (req, res) {
    res.render("index");
})

router.get("/account/login", async function(req,res){
    res.render("account/login");
})

router.post("account/login", async function(req,res){
    console.log(req);
    const emailAddress = req.body.email;
    const password = req.body.password;
})

router.get("/account/register", async function(req,res){
    res.render("account/register")
})

router.post("/account/register", async function(req,res){
    try{
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        password===confirmPassword?res.send("Password Matching"):res.send("Passwords Do not match")

    }
    catch(error){
        console.log(error)
    }
})

router.get("/blog/writeblog", async function(req,res){
    res.render("writeblog");
})

router.post("/blog/writeblog", async function(req,res){
    const blogTitle = req.body.blogTitle;

    
})
module.exports = router;