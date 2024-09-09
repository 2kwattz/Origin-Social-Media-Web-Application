const mongoose = require("mongoose")
const commentsSchema = require("../blogposts/comments")
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify'); // For URL Friendly Unique String Generation

const postsSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Register',
        required: true,
    },
    postContent:{
        type: String,
        required: true,
        trim: true,
        maxlength: 850,
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
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Register'}],
})

postsSchema.pre('save', function(next){
    if (!this.slug){
        slugContent = slugify(this.postContent, {lower:true, strict: true}).substring(0,50)

        // Adding a unique suffix to prevent duplication
        const uniqueSuffix = Date.now().toString();
        this.slug = `${slugContent}-${uniqueSuffix}`;
    }
    next();
})

const PostModel = mongoose.model('PostModel', postsSchema);
module.exports = PostModel