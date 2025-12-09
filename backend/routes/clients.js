const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const { upload, cropAndSave } = require('../middlewares/uploadAndCrop');
const path = require('path');
const fs = require('fs');

// GET /api/clients - list clients
router.get('/', async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/clients - create client (multipart/form-data)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, designation, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });

    let imageUrl = '';
    if (req.file) {
      // crop to square-ish for avatars: 200x200 (you can change)
      imageUrl = await cropAndSave(req.file.buffer, req.file.originalname, 200, 200);
    }

    const client = new Client({ name, designation, description, imageUrl });
    await client.save();
    res.json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create client' });
  }
});

// DELETE /api/clients/:id - remove client and file
router.delete('/:id', async (req, res) => {
  try {
    const c = await Client.findById(req.params.id);
    if (!c) return res.status(404).json({ error: 'Client not found' });

    if (c.imageUrl) {
      const filePath = path.join(__dirname, '..', c.imageUrl);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await c.remove();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;
