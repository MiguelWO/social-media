const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
require('dotenv').config();

  router.post('/register', async (req, res) => {
    // Check if user exists in database and verify password
    // If successful, generate JWT token and return it in response
    try {
      const { username, email, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

      const existingUser = await User.findOne({ username: username });

      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const newUser = new User({
        username,
        email,
        password,
      });

      const savedUser = await newUser.save();
      
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });

      // res.cookie('jwt', token, {httpOnly: true});
      // res.json({message: 'User created successfully', user: savedUser, token: token});

      res.status(201).json({message: 'User created successfully', user: savedUser, token: token});
    } catch (err) {
      // res.status(500).json({ error: err.message });
    }
  });

  router.post('/login', async (req, res) => {
    // Handle user login
    try{
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
      }

      const user = await User.findOne({ username: username });

      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });

      // res.cookie('jwt', token, {httpOnly: true});
      res.json({message: 'User logged in successfully', user: user, token: token});

    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/:id', async (req, res) => {
    // Retrieve user profile information by ID
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(400).json({ msg: 'User does not exist' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


module.exports = router;