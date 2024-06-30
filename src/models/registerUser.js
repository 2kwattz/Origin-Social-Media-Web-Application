const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

const secret_key = "just_a_random_32bits_secret_key_used_for_jwt_token_authentication"


const userSchema = new mongoose.Schema({

    userFirstName: {
        type: String,
        required: true,
    },
    userLastName: {
        type: String,
        required: true,
    },

    userEmail: {
        type: String,
        required: true,
        unique: true,
    },

    userPassword: {
        type:String,
        required: true,
    },

    userConfirmPassword:{
        type:String,
        required: true,
    },

    userGender: {
        type: String,
        required: true,

    },

    userCity: {
        type: String,
    },

    userState: {
        type: String,
    },

    userCountry: {
        type: String,
    },

    userSecurityQuestionAnswer: {
        type:String

    },
})

userSchema.pre("save", async function(next){
    
    if(this.isModified("userPassword")){
        this.userPassword = await bcrypt.hash(this.userPassword, 10);  
        this.userConfirmPassword = undefined
    }
    next()
})

userSchema.methods.generateAuthtoken = async function(){
try{
    let token = jwt.sign({_id:this._id,secret_key},{
        expiresIn: "1h"
    })
}

catch(error){
    console.log(error)
    res.send("Error while generating JWT token")
}
}

const RegisterUser = new mongoose.model("Register", userSchema)

module.exports = RegisterUser