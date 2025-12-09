const express = require('express');
const { upload, cropAndSave } = require('../middlewares/uploadAndCrop');
const router = express.Router();

router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imagePath = null;

    if (req.file) {
      imagePath = await cropAndSave(req.file.buffer, req.file.originalname, 1200, 800);
    }

    // Example response (you will insert DB logic here)
    res.json({
      success: true,
      image: imagePath
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
