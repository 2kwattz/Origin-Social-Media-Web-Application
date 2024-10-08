# Origin-Social-Media-Web-Application (Under Development)

A free social media platform to share your daily quotes, stories, ideas and more!

 Key Features
- Social Media type feed for text, images and blog posts
- Community Chats for people with similar niche
- Personal Chats
- Video & Voice based calling
- Ability to post and share news articles
- Ability to post stories
- Ability to buy/sell products
  
# Work Done

- Integrated JWT Token based Login System & Bcrypt Hashing Encryption for user validation
- Added Functionality to Create and Join Chatrooms based on individual room ids
- Created separate Schema & Model for writing blog posts and rendering using dynamic templating
- Created Schema and Model for creating a social media post via Home page
- Integrated the basic structure of Posts Data into RESTful API and displayed it in home feed. (Eventually need to refine it)
- Developed frontend for the Home feed & Navbar 
- Implemented Blog Posts Functionality to create a blog with Title, Subtitle, Blog Content, Images, Author and much more
- Integrated WebSocket based Events for building community chatrooms. Created Models with unique key generation to access individual chatrooms
- Binded User's authentication details to server side session middleware for linking socket connection with user details
- Added Chat functionality support for Anonymous/Guest user apart from authenticated users
- Minor refinements on frontend UI for aesthetic looking purposes

# Work to be done in NEAR future

## Community Chat

- Creating a carousel dashboard of community chatrooms. (Ever seen netflix's UI?) A sort of combination of community forms and facebook groups, With options to create and join from the dashboard itself and creating an API for the same
- A separate carousel to show the groups / community chats the user has already joined. An option within the 3 dots to leave. Would be storing the community chat's reference in the user's model
- Add separate feature for public and private community chat rooms
- A separate view to show the users online, Show typiing message, Ablility to send text messages, Location, Images, Live Location, Emojis, Number of users connected. In Chat notifications for users connected and disconnected, voice notes, video and audio calls, Documents, read reciepts and last seen
- Ability to store and clear chats
- Ability to view a short view of user profile on hovering the users within the chatroom

## My Profile

- Creation of dynamic profile based on slugs and nodejs dynamic templating
- Adding and Updation of Users Profile Picture
- Adding a short bio and cover pic

 ## Security

- Sanitization of user input to prevent malicious injections like SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF).
- Usage of parameterized queries instead of concatenating user input directly into SQL queries.
-  Implementation of measures to limit the number of unsuccessful login attempts to prevent brute force attacks.

- # Follow me on Instagram :) @2kwattz
