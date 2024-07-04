const jwt = require("jsonwebtoken");
const RegisterUser = require("../src/models/registerUser");

const secret_key = "just_a_random_32bits_secret_key_used_for_jwt_token_authentication";

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).send({ error: "Access Denied. No token provided." });
        }
        
        const verifyUser = jwt.verify(token, secret_key);

        // Getting Users Data
        const user = await RegisterUser.findOne({ _id: verifyUser._id }); // Await the promise
        if (!user) {
            return res.status(401).send({ error: "Access Denied. User not found." });
        }
        
        console.log("Validated User Authentication for _id", user._id);

        // Add user to request object

        req.session.userId = user._id;
                req.session.userFirstName = user.userFirstName;
                req.session.loggedIn = true;
                req.session.userLastName = user.userLastName;
                console.log("Session Data ",req.session)

        req.user = user;

        next();
    } catch (error) {
        res.status(401).send({ error: "Invalid token or user not authenticated." });
    }
};

module.exports = auth;
