const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// -----------------------------------------------------------------------------
// SETUP DIRECTORIES
// -----------------------------------------------------------------------------
const UPLOAD_ROOT = path.join(__dirname, '..', 'uploads');
const PROJECT_UPLOAD_DIR = path.join(UPLOAD_ROOT, 'projects');

// ensure /uploads and /uploads/projects exist
fs.mkdirSync(PROJECT_UPLOAD_DIR, { recursive: true });

// -----------------------------------------------------------------------------
// MULTER MEMORY STORAGE + FILE FILTER
// -----------------------------------------------------------------------------
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// -----------------------------------------------------------------------------
// IMAGE CROP + SAVE FUNCTION
// -----------------------------------------------------------------------------
/**
 * cropAndSave(buffer, originalName, width?, height?)
 * Returns: `/uploads/projects/filename.jpg`
 */
async function cropAndSave(buffer, originalName, width = 450, height = 350) {
  const ext = path.extname(originalName) || '.jpg';
  const filename = crypto.randomBytes(12).toString('hex') + ext;

  const outputPath = path.join(PROJECT_UPLOAD_DIR, filename);

  await sharp(buffer)
    .resize(width, height, { fit: 'cover' }) // center crop + resize
    .toFile(outputPath);

  // Return relative path for frontend/database
  return `/uploads/projects/${filename}`;
}

// -----------------------------------------------------------------------------
// EXPORTS
// -----------------------------------------------------------------------------
module.exports = {
  upload,
  cropAndSave,
};
