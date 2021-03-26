const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Category = require('../models/Category');

// @route    GET api/categories
// @desc     Get all categories
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find().sort({
      date: -1
    });
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/categories
// @desc     Create a category
// @access   Private
router.post('/', [auth,
  check('title', 'Title is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  const { title, description } = req.body;

  try {
    const newCategory = new Category({
      title,
      description
    });

    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/categories/:id
// desc     Update category
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description } = req.body;
  // Build category object
  const categoryFields = {};
  if (title) categoryFields.title = title;
  if (description) categoryFields.description = description;

  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category Not Found' });
    }


    category = await Category.findByIdAndUpdate(req.params.id,
      { $set: categoryFields },
      { new: true }
    );

    res.json(category);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   DELETE api/categories/:id
// desc     Delete category
// @access  Private
// @ts-ignore
router.delete('/:id', auth, async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: 'Category Not Found' });
    }

    await Category.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Category Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
