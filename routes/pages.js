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

router.get("/login", async function(req,res){
    res.render("login");
})

router.get("writeBlog", async function(req,res){
    res.render("writeblog");
})
module.exports = router;