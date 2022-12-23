const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const pinRoute = require('./routes/pins');
const userRoute = require('./routes/users')

const app = express();
app.use(express.json());

env.config();



mongoose.connect(process.env.MONG0_CONNECTION_STRING)
    .then(() => {
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Mongo DB connected✅');
    })
    .catch((err) => console.log('\x1b[41m%s\x1b[0m', '[FAILED] to connect to MongoDB !'));


app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);


app.listen(3000, () => {
    console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Backend server running....');
});