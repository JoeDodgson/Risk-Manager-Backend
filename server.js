// Require in local npm modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

// Require in local files
const db = require("./db/index");
const router = require('./routes/index');

// Configure dotenv
dotenv.config();

// Define port
const PORT = process.env.PORT || 8080;

// Define express server and middleware
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Specify API routes
app.use('/api', router);

// Connect to MongoDB using mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/engineerdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, () => {
    console.log('successfully connected to database');
}); 

// Start the express server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
