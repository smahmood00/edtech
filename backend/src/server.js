require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use(routes);

// Connect to database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});