const express = require('express'); // Express Framework
const axios = require('axios'); // HTTP Request Maker
const fs = require('fs'); // File System Module
const app = express(); // Express Instance
const bodyParser = require('body-parser'); // Post Request Data Fetcher
const hbs = require('hbs'); // Template Engine
const cookieParser = require('cookie-parser'); // For Login
const path = require('path');
const compression = require("compression"); // Optimizer
const http = require('http');  // http request maker
const nodemon = require('nodemon'); // For Server Restart 
const multer = require('multer');
const cors = require('cors'); // Cross Enviornment
const storage = multer.memoryStorage();
const MongoStore = require('connect-mongo');
const session = require('express-session');
const port = process.env.PORT || 80;

// Session Configuration

const sessionMiddleware = session({
  secret: 'random_secret_key_for_session_configuration', // Use a strong secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017' }) // Replace with your MongoDB URL
});

app.use(sessionMiddleware)

// Socket.IO Chat App

const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

const getSocketsFromSession = (request) => {
  return request.user ? request.user._id: null;
}

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

let connectedSockets = {};

// Socket.io Events
io.on("connection", function(socket){
  const session = socket.request.session;
  session.loggedIn?console.log(`${session.userFirstName} ${session.userLastName} has been connected with socket id ${socket.id}`): console.log(`Client with socket id ${socket.id} has been connected `)
 
  connectedSockets
})

// Database
const mongoose = require('mongoose');
require("./db/conn")

// Database Schemas
const RegisterUser = require("./models/registerUser")
const jwt = require("jsonwebtoken")

// JWT Token Generation

const createToken = async() => {
  const token = await jwt.sign({_id:"668042780026b6991062fe9c"}, "random_secret_key_making_sure_its_more_than_32chars_long")
  expiresIn:"15 minutes"
}
createToken()

// Middlewares

app.use(cookieParser());
// Enable CORS
app.use(cors());

// To get form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('../routes/pages'));

// Security Middleware
const helmet = require('helmet');
app.use(helmet()); // Setting Security Headers

// Paths
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const messagePath = path.join(__dirname, "../dev-data/messages");
const routesPath = path.join(__dirname, "../routes");

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);

// Set Helper

// Register the 'eq' helper
hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });

  // app.listen(port, () => {
  //   console.log(`Server is running on port ${port}`);
  // });

  // Error Handeling

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke! ');
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

  
