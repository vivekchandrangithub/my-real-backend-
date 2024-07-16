// server.js
const express = require('express');
const connectDB = require('./database');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', require('./routes/bookRoutes'));
app.use('/api/authors', require('./routes/authorRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));