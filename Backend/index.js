// Main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Frontend dev server
  credentials: true // Allow cookies/auth if needed
}));
app.use(express.json()); // Parse JSON request bodies

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI ;
const PORT = process.env.PORT || 5001;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Routes
const userRouter = require('./routes/user');
app.use('/api/users', userRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

// Global error handler (fallback)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
