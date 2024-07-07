const mongoose = require("mongoose")
const commentsSchema = require("../blogposts/comments")
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify'); // For URL Friendly Unique String Generation

const ChatRoomSchema = new mongoose.Schema({

    chatRoomTitle: {
        type: String,
        required: true,
        trim: true,
        unique: false,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    
})

ChatRoomSchema.pre('validate', function (next) {
    if (this.chatRoomTitle) {
        this.slug = slugify(this.chatRoomTitle, { lower: true, strict: true });
    }
    next();
})

const ChatRoomModel = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = ChatRoomModel;