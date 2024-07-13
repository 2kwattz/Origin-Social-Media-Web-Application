const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const compression = require('compression');
const multer = require('multer');
const fs = require('fs');
const hbs = require('hbs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = process.env.PORT || 80;

// Database setup
require('./db/conn');
const RegisterUser = require('./models/registerUser');

// Session configuration
const sessionMiddleware = session({
  secret: 'random_secret_key_for_session_configuration',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/' }), // Replace with your MongoDB URL
});

// Middleware setup
app.use(sessionMiddleware);
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(compression());
app.use(express.static(path.join(__dirname, '../public')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../templates/views'));
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// Socket.IO middleware for session management
io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
});

// Socket.IO events
io.on('connection', async (socket) => {
  try {
    const session = socket.request.session;
    if (session.loggedIn) {

      // User is authenticated
      console.log(`${session.userFirstName} ${session.userLastName} connected with socket id ${socket.id}`);
      // Handle user connections, disconnections, chat messages, etc.
    } else {
      console.log('Anonymous user connected');
      // Handle anonymous user connections, if needed
    }
  } catch (error) {
    console.error('Error while mapping sockets to session', error);
  }

  
  socket.on('chatMessage', (messageData) => {
    
    console.log("Message data recieved", messageData)
    
    console.log('Message from client:', messageData.message);
    io.emit('chatMessage', messageData);
  });

  socket.on('disconnect', () => {
    const session = socket.request.session;
    if (session.loggedIn) {
      console.log(`User ${session.userFirstName} ${session.userLastName} disconnected`);
      // Handle disconnection logic, update connected users list, etc.
    }
  });
});

// JWT token generation (example, adjust as needed)
const createToken = () => {
  const token = jwt.sign({ _id: '668042780026b6991062fe9c' }, 'random_secret_key_making_sure_its_more_than_32chars_long', {
    expiresIn: '15 minutes',
  });
  return token;
};
createToken();

// Example route setup
app.use('/', require('../routes/pages'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Server listening
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
