const mongoose = require("mongoose")

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
    
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);  
        this.confirmPassword = undefined
    }

    next()
        
})

const RegisterUser = new mongoose.model("Register", userSchema)

module.exports = RegisterUser