const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

// Enable CORS for frontend at http://localhost:3000
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());  // Middleware to parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});

// Register the routes
app.use('/api/auth', authRoutes);  // Auth routes path

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
