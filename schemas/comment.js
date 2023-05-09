const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body : { type: String, required: true },
    author : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt : { type: Date, default: Date.now },
    post : { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;