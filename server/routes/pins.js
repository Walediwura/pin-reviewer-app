const router = require('express').Router();

const Pin = require('../models/Pin');

// Creating a new Pin and store to DB

router.post('/', async(req, res) => {
    const pinCandidate = new Pin(req.body)

    try {
        const savedPin = await pinCandidate.save();
        res.status(200).json(savedPin);
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] PIN added to DB ✅');

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] PIN could not be added to DB !');
        res.status(500).json(err);

    }
})

// Get all Pins

router.get('/', async(req, res) => {
    try {
        const pins = await Pin.find();
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Finding all pins ✅');
        res.status(200).json(pins);

    } catch (err) {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Finding all pins!');
        res.status(500).json(err);

    }
});

module.exports = router;