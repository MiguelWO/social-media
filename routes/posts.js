const express = require('express');
const router = express.Router();

const Post = require('../schemas/post');
const User = require('../schemas/user');

const auth = require('../middleware/authMiddleware');

router.post('/posts', auth , async (req, res) => {
  const { title, content } = req.body;
  // console.log(req.user);
  // console.log(req.body);
  try {
    const post = new Post({
      title : title,
      body: content,
      author : req.user._id
    });

    const savedPost = await post.save();
    res.status(201).json({ message: 'Post created successfully', post: savedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/posts', async (req, res) => {
  try {
    // const posts = await Post.find().populate('author');
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/posts/:id', async (req, res) => {
  try{
    const post = await Post.findById(req.params.id).populate('user');
    if (!post) {
      return res.status(400).json({ message: 'Post does not exist' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/posts/:id', auth, async (req, res) => {
  const { title, content } = req.body;
  try{
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: 'Post does not exist' });
    }

    if (post.user.toString() !== req.user._id.toString) {
      return res.status(401).json({ message: 'You are not authorized to update this post' });
    }

    post.title = title;
    post.content = content;
    const savedPost = await post.save();
    res.json({ message: 'Post updated successfully', post: savedPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/posts/:id', auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(400).json({ message: 'Post does not exist' });
    }

    if (post.user.toString() !== req.user._id.toString) {
      return res.status(401).json({ message: 'You are not authorized to delete this post' });
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
