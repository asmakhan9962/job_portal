const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require("path");

// connect database
connectDB();

// Init Middleware
// @ts-ignore
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.json({ msg: 'Welcome to Rizk.pk' }));
// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/cities', require('./routes/cities'));
app.use('/api/jobs', require('./routes/jobs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));