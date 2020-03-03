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

// for localhost
//const PORT = process.env.PORT || 5000;

//app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

/////// for live
app.use(express.static('admin/build'));

app.use('/uploads', express.static('admin/public/uploads'));

app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'admin', 'build', 'index.html')));

const PORT = process.env.PORT || 8000;

// @ts-ignore
app.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`));

