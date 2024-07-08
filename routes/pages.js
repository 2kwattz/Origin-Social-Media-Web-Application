const nodemailer = require('nodemailer'); // For Verification OTP
const jwt = require('jsonwebtoken'); // User Authentication for Chat Application 
const cookieParser = require('cookie-parser');
const express = require('express'); // Express Framework
const app = express(); // Instance of Express
const path = require('path'); // Defines Static Path and Temp
const router = express.Router();
const bcrypt = require('bcrypt'); // For hashing password
const auth = require("../middleware/auth")
const slugify = require('slugify'); // For URL Friendly Unique String Generation

// Database Schemas

const RegisterUser = require("../src/models/registerUser")
const BlogPostsModel = require("../src/models/blogposts/blogposts")
const ChatRoomModel = require("../src/models/chatRooms/chatroom")


app.use(cookieParser());

router.get("/", async function (req, res) {
    res.render("index");
})

router.get("/account/login", async function (req, res) {
    res.render("account/login");
})

router.post("/account/login", async function (req, res) {
    console.log(req);
    const emailAddress = req.body.email;
    const password = req.body.password;

    try {
        const verifiedEmail = await RegisterUser.findOne({ userEmail: emailAddress });

        if (verifiedEmail) {
            const isMatch = bcrypt.compare(password, verifiedEmail.userPassword)

            if (isMatch) {
                const token = await verifiedEmail.generateAuthtoken()
                console.log(`JWT Token Generated ${token}`)
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                })
                console.log("Session Data ",req.session)
                res.status(201).render("index");
            }
        }
        else {
            res.render("Credentials are not matching")
        }
        console.log(verifiedEmail)
    }
    catch (error) {
        console.log(error)
        res.send("Invalid Email or password")
    }


})

router.get("/account/register", async function (req, res) {
    res.render("account/register")
})

router.post("/account/register", async function (req, res) {
    try {
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword;

        if (password === confirmPassword) {

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

            if (registered) {
                res.status(201).render("index")
            }
            else {
                res.send("Registering Error")
            }
        }
        else {
            res.send("Passwords Do Not Match")

        }
    }
    catch (error) {
        console.log(error)
    }
})

router.get("/blog/writeblog", auth, async function (req, res) {
    res.render("blog/writeblog");
})

router.post("/blog/writeblog", auth, async function (req, res) {
    const blogTitle = req.body.blogTitle;
    const blogSubheading = req.body.blogSubheading;
    const blogContent = req.body.blogContent;
    const blogStatus = "Published";
    const blogAuthor = req.user._id;

    new BlogPostsModel({
        blogTitle,
        blogSubheading,
        blogContent,
        blogStatus,
        blogAuthor,
    })
        .save()
        .then(doc => {
            console.log('Blog post saved:', doc);
        })
        .catch(err => {

            console.error('Error:', err);
        }
        );

    res.render("blog/writeblog");
})

// Blog Template 

router.get("/blog/:slug", async function (req, res) {
    const slug = req.params.slug
    try {
        const blogPost = await BlogPostsModel.findOne({ slug })
        console.log(blogPost)
        const blogPostUrl = `/blog/${slug}`;
        if (!blogPost) {
            // Handle non-existent slug (e.g., 404 Not Found)
            return res.status(404).send("Blog post not found");
        }
        res.render("blog/blogTemplate", { blogPost })

    }
    catch (error) {
        res.send(error)
    }

})

router.get("/community/chat/:chatRoomNumber", auth, async function (req, res) {
    const chatRoomNumber = req.params.chatRoomNumber;
    const sessionData = req.session;
    console.log("Chat Room Number fetched from the route", chatRoomNumber)
    try{
        const chatRoom = await ChatRoomModel.findOne({chatRoomNumber})
        if (!chatRoom){
            return res.status(404).send("Chat Room Not Found")
        }
        console.log("User data from chatroom page", RegisterUser.userFirstName)


        res.render("chat/chatroomtemplate", {chatRoom,chatRoomNumber,RegisterUser,sessionData})

    }
    catch(error){
        res.send(error)
    }

})

// Create & Join Chat

router.get("/community/createchat", auth, async function(req,res){
    res.render("chat/createChatroom")

})

router.get("/community/joinchat",auth, async function(req,res){
    res.render("chat/joinchat")
})

router.post("/community/joinchat",auth, async function(req,res){
    const chatRoomId = req.body.chatRoomId;

    res.render("chat/chatroomtemplate", {chatRoom,chatRoomId})
})

router.post("/community/createchat", auth, async function(req,res){

    const chatRoomTitle = req.body.chatRoomTitle;

    const newChatRoom = new ChatRoomModel({chatRoomTitle})

    const savedChatRoom = await newChatRoom.save();
    const newChatRoomId = savedChatRoom.chatRoomNumber;
    console.log("Chatroom Saved",savedChatRoom)

    res.render("chat/createChatroom", {newChatRoomId})

})


// Authentication Routes

// Logout
router.get("/logout", auth, async function (req, res) {
    try {

        req.user.tokens = req.user.tokens.filter((currentElement) => {
            return currentElement.token !== req.token
        })
        res.clearCookie("jwt")
        sessionStorage.clear();
        console.log("Logout Successfull")
        await req.user.save()
        res.render("account/login")
    }
    catch (error) {
        res.status(500).send(error)
    }
})

// Logout from all devices

router.get("/logoutall", auth, async function (req, res) {
    try {

        console.log(req.user)

        req.user.userTokens = []
        await res.clearCookie("jwt")
        await sessionStorage.clear();
        console.log("Logout from all devices Successfull")
        await req.user.save()
        res.render("account/login")
    }
    catch (error) {
        res.status(500).send(error)
    }
})


module.exports = router;