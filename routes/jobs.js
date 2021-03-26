const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Job = require('../models/Job');
const User = require('../models/User');
const auth = require('../middleware/auth');
const fs = require('fs');

// @route   GET api/jobs
// desc     Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // @ts-ignore
    const jobs = await Job.find().sort({ date: -1 }).limit(50);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error1');
  }
});

// @route   POST api/jobs
// desc     Add new job
// @access  Private
router.post('/', [auth,
  check('title', 'Title is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array() })
  }

  const { category, city, title, job_description, selectedimage, phone, email, featured } = req.body;
  function decodeBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var response = {};

    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }

    response['type'] = matches[1];
    response['data'] = new Buffer(matches[2], 'base64');

    return response;
  }
  var imageBuffer = decodeBase64Image(selectedimage);

  console.log('imageBuffer', imageBuffer['type']);
  var imgType = imageBuffer['type'].replace(/image\//, "");
  var base64Data = imageBuffer['data'];
  var crypto = require('crypto');
  var seed = crypto.randomBytes(20);
  var uniqueSHA1String = crypto.createHash('sha1').update(seed).digest('hex');
  var uniqueImageName = 'image-' + uniqueSHA1String;



  try {
    if (base64Data) {
      console.log('req.body', base64Data);
      var imagename = uniqueImageName + '.' + imgType;
      fs.writeFile("admin/public/uploads/" + imagename, base64Data, 'base64', function (err) {
        console.log(err);
      });
    }
    else {
      res.status(500).send('Only .jpg and .png images are allowed');
    }

    const newJob = new Job({
      category,
      city,
      title,
      job_description,
      phone,
      email,
      featured,
      image: imagename
    });

    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error2');
  }
});


// @route   PUT api/jobs/:id
// desc     Update job
// @access  Private
router.put('/:id', auth, async (req, res) => {
  console.log('body', req.body);
  const { category, city, title, job_description, image, phone, email, featured } = req.body;
  // Build job object
  const jobFields = {};
  if (category) jobFields.category = category;
  if (city) jobFields.city = city;
  if (title) jobFields.title = title;
  if (job_description) jobFields.job_description = job_description;
  if (phone) jobFields.phone = phone;
  if (email) jobFields.email = email;
  jobFields.featured = featured;
  if (image) jobFields.image = image;

  console.log('jobFields', jobFields);

  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job Not Found' });
    }

    job = await Job.findByIdAndUpdate(req.params.id,
      { $set: jobFields },
      { new: true }
    );

    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error3');
  }
});


// @route   DELETE api/jobs/:id
// desc     Delete job
// @access  Private
// @ts-ignore
router.delete('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job Not Found' });
    }

    // @ts-ignore
    fs.unlinkSync("admin/public/uploads/" + job.image);
    await Job.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Job Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error4');
  }
});

// @route   Get api/jobs/:id
// desc     Get job by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job Not Found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error4');
  }
});

// @route   GET api/jobs/ft/jobs
// desc     Get FT jobs
// @access  Private
router.get('/ft/jobs', auth, async (req, res) => {
  try {
    // @ts-ignore
    const jobs = await Job.find({ featured: true }).sort({ date: -1 }).limit(5);
    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Get FT jobs');
  }
});

// @route   GET api/jobs/user/jobs
// desc     Get User jobs
// @access  Private
router.get('/user/jobs', auth, async (req, res) => {
  let cities = []; let cats = [];
  // @ts-ignore
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ msg: 'User Not Found' });
  }
  // @ts-ignore
  if (user.ckdCities.length > 0) {
    // @ts-ignore
    cities = user.ckdCities;
  }

  // @ts-ignore
  if (user.ckdCats.length > 0) {
    // @ts-ignore
    cats = user.ckdCats;
  }

  console.log('cities', cities);
  console.log('cats', cats);

  try {

    const jobs = await Job.find({ $or: [{ city: { $elemMatch: { key: { $in: cities } } } }, { category: { $elemMatch: { key: { $in: cats } } } }] });

    res.json(jobs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error1');
  }
});


module.exports = router;
