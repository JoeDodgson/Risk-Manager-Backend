const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

// db connect to different schema
const db = require("./db/index");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/engineerdb", {
    useNewUrlParser: true,
    //useFindAndModify: false,
    useUnifiedTopology: true
}, () =>{
    console.log('successfully connected to database');
}); 
mongoose.set('useCreateIndex', true);

const router = require('./routes/index');
app.use('/api', router);



app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
