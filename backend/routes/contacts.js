const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET /api/contacts - list form submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/contacts - receive contact form
router.post('/', async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    if (!fullName || !email) return res.status(400).json({ error: 'fullName and email required' });

    const c = new Contact({ fullName, email, mobile, city });
    await c.save();
    res.json({ success: true, contact: c });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit contact' });
  }
});

module.exports = router;
