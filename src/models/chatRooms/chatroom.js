const mongoose = require("mongoose")
const commentsSchema = require("../blogposts/comments")
const uniqueValidator = require('mongoose-unique-validator');
const slugify = require('slugify'); // For URL Friendly Unique String Generation
const crypto = require("crypto");

function generateRoomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    // Buffer Generation
    const randomBytes = crypto.randomBytes(length)

    let randomString = ``;

    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % charactersLength;
        randomString += characters[randomIndex];
    }

    return randomString;

}

const ChatRoomSchema = new mongoose.Schema({

    chatRoomTitle: {
        type: String,
        required: true,
        trim: true,
        unique: false,
    },

    chatRoomNumber: {
        type: String,
        unique: true,
    },

    slug: {
        type: String,
        unique: true,
        lowercase: true
    },

})

ChatRoomSchema.pre('save', function (next) {

    const chatRoom = this;
    const chatRoomNumber = generateRoomId(8)


    if (chatRoom.isNew) {
        this.slug = slugify(this.chatRoomTitle, { lower: true, strict: true });

        console.log("Generated Room Id is ", chatRoomNumber)
        this.chatRoomNumber = chatRoomNumber;
    }

    console.log("Chat Room Object", chatRoom)
    next();
})

const ChatRoomModel = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = ChatRoomModel;