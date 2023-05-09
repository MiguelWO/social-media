const express = require('express');
const router = express.Router();

const User = require('../schemas/user');
const auth = require('../middleware/authMiddleware');

router.post('/users', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({
      username,
      email,
      password
    });

    const savedUser = await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({ message: 'User created successfully', user: savedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.username, req.body.password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600 * 1000 });
    res.json({ message: 'User logged in successfully', user: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/users/me', auth, async (req, res) => {
  res.json(req.user);
}
);

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'User logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.clearCookie('jwt');
    res.json({ message: 'User logged out successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (req.body.username) {
      user.username = req.body.username;
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;



