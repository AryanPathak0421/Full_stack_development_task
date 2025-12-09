const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// GET /api/subscribers - list subscribers
router.get('/', async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/subscribers - add new subscriber
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email required' });

    const sub = new Subscriber({ email });
    await sub.save();
    res.json({ success: true, subscriber: sub });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Email already subscribed' });
    }
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

module.exports = router;
