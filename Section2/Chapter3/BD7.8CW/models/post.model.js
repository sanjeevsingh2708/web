const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: {type:mongoose.Schema.Types.ObjectId, ref: "User"},
})

const Post = mongoose.model("post", postSchema);

module.exports = Post 