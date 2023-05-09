const moongoose = require('mongoose');

const postSchema = new moongoose.Schema({
    title : { type: String, required: true },
    body : { type: String, required: true },
    author : { type: moongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt : { type: Date, default: Date.now },
    comments : [{ type: moongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

const Post = moongoose.model('Post', postSchema);

module.exports = Post;