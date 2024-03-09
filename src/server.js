const express = require('express'); // Express Framework
const axios = require('axios'); // HTTP Request Maker
const fs = require('fs'); // File System Module
const app = express(); // Express Instance
const bodyParser = require('body-parser'); // Post Request Data Fetcher
const hbs = require('hbs'); // Template Engine
const cookieParser = require('cookie-parser'); // For Login
const path = require('path');
const compression = require("compression"); // Optimizer
const http = require('http').Server(app); // http request maker
const nodemon = require('nodemon'); // For Server Restart 
const multer = require('multer')

// Middlewares

app.use(cookieParser());
const cors = require('cors'); // Cross Enviornment
const storage = multer.memoryStorage();

// Paths
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const messagePath = path.join(__dirname, "../dev-data/messages");

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(staticPath));
hbs.registerPartials(partialsPath);

// Set Helper

// Register the 'eq' helper
hbs.registerHelper('eq', function (a, b) {
    return a === b;
  });

  
