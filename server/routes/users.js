const router = require('express').Router();
const User = require('../models/User');

const bcrypt = require('bcrypt');

// Register

router.post('/register', async(req, res) => {
    try {
        // genrate password
        const salt = await bcrypt.genSalt(10);
        const cryptedPass = bcrypt.hash(req.body.password, salt);

        // Creating new User
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: cryptedPass
        })

        // Push User to DB

        const userSaved = await newUser.save();
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Registering User ✅');
        res.status(200).json(userSaved._id);


    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Registering User !');
        res.status(500).json(err);
    }
})

// Login

router.post('/login', async(req, res) => {

    try {
        const user = await User.findOne({ username: req.body.userName });

        if (!user) {
            console.log('\x1b[41m%s\x1b[0m', '[FAILED] Login User !');
            res.status(400).json('Wrong username or password');
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password);

            if (!validPassword) {
                console.log('\x1b[41m%s\x1b[0m', '[FAILED] logging in User !');
                res.status(400).json('Wrong username or password');
            } else {
                console.log('\x1b[41m%s\x1b[0m', '[SUCCESS] Registering User !');
                res.status(200).json('');
            }
        }

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Logging in with User !');
        res.status(500).json;

    }
})
module.exports = router;