const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route   POST api/users
// desc     Register a user
// @access  Public  
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('password', 'Please make password at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'user already exists' });
    }

    user = new User({
      name,
      email,
      password
    });

    const salt = await bcrypt.genSalt(10);
    // @ts-ignore
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});


// @route   PUT api/users/:id
// desc     Update User
// @access  Private  
router.put('/:id', auth, async (req, res) => {
  const { checkedCities, checkedCategories } = req.body;
  // Build user object
  const userFields = {};
  if (checkedCities) userFields.ckdCities = checkedCities;
  if (checkedCategories) userFields.ckdCats = checkedCategories;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User Not Found' });
    }


    user = await User.findByIdAndUpdate(req.params.id,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   Get api/users/:id
// desc     Get Specific User
// @access  Private  
router.get('/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User Not Found' });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
