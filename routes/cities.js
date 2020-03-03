const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const City = require('../models/City');

// @route    GET api/cities
// @desc     Get all cities
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const cities = await City.find().sort({
      date: -1
    });
    res.json(cities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/cities
// @desc     Create a city
// @access   Private
router.post('/', [auth,
  check('name', 'Name is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  const { name, country } = req.body;

  try {
    const newCity = new City({
      name,
      country
    });

    const city = await newCity.save();
    res.json(city);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/cities/:id
// desc     Update city
// @access  Private  
router.put('/:id', auth, async (req, res) => {
  const { name, country } = req.body;
  // Build city object
  const cityFields = {};
  if (name) cityFields.name = name;
  if (country) cityFields.country = country;

  try {
    let city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City Not Found' });
    }


    city = await City.findByIdAndUpdate(req.params.id,
      { $set: cityFields },
      { new: true }
    );

    res.json(city);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/cities/:id
// desc     Delete city
// @access  Private  
// @ts-ignore
router.delete('/:id', auth, async (req, res) => {
  try {
    let city = await City.findById(req.params.id);
    if (!city) {
      return res.status(404).json({ msg: 'City Not Found' });
    }

    await City.findByIdAndRemove(req.params.id);
    res.json({ msg: 'City Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
