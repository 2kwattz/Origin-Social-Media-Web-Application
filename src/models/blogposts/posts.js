const mongoose = require("mongoose")
const commentsSchema = require("../blogposts/comments")
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify'); // For URL Friendly Unique String Generation

const postsSchema = new mongoose.Schema({
    postContent:{
        type: String,
        required: true,
        trim: true,
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
})