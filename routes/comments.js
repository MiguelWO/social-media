const express = require('express');
const router = express.Router();

const Comment = require('../schemas/comment');
const User = require('../schemas/user');
const Post = require('../schemas/post');

const auth = require('../middleware/authMiddleware');

router.post('/posts/:postId/comments', auth , async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(400).json({ message: 'Post does not exist' });
        }

        const comment = new Comment({
            body: req.body.content,
            user : req.user._id,
            post: req.params.postId
        });

        const savedComment = await comment.save();
        res.status(201).json({ message: 'Comment created successfully', comment: savedComment });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/posts/:postId/comments', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('user');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/comments/:id', auth, async (req, res) => {
    try{
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(400).json({ message: 'Comment does not exist' });
      }

      if (comment.user.toString() !== req.user._id) {
        return res.status(401).json({ message: 'You are not authorized to update this comment' });
      }

      comment.content = req.body.content;
      const savedComment = await comment.save();
      res.json({ message: 'Comment updated successfully', comment: savedComment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

router.delete('/comments/:id', auth, async (req, res) => {
    try{
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(400).json({ message: 'Comment does not exist' });
      }

      if (comment.user.toString() !== req.user._id) {
        return res.status(401).json({ message: 'You are not authorized to delete this comment' });
      }

      await comment.remove();
      res.json({ message: 'Comment deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = router;

