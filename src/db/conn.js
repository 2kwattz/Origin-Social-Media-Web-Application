const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/origin").then(function(){
    console.log("Mongoose Database Has Been Connected")
}).catch(function(e){
    console.log(`Error Connecting to the Mongoose Database.\n ${e} `)
})