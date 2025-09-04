const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Get all available files in uploads directory
const getAvailableFiles = () => {
  const uploadsDir = path.join(__dirname, '../../uploads');
  try {
    return fs.readdirSync(uploadsDir).filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );
  } catch (error) {
    return [];
  }
};

// Map categories to placeholder images
const categoryPlaceholders = {
  'Fashion': 'fashion-placeholder.jpg',
  'Furnitures': 'furniture-placeholder.png', 
  'Computers & Accessories': 'tech-placeholder.png',
  'Foods': 'food-placeholder.jpg',
  'default': 'general-placeholder.jpg'
};

// Image proxy middleware
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  const uploadsDir = path.join(__dirname, '../../uploads');
  const placeholdersDir = path.join(uploadsDir, 'placeholders');
  
  // First, try to find the exact file
  const exactPath = path.join(uploadsDir, filename);
  if (fs.existsSync(exactPath)) {
    return res.sendFile(exactPath);
  }

  // If filename ends with -blob, try to find a similar file
  if (filename.includes('-blob')) {
    const availableFiles = getAvailableFiles();
    const baseTimestamp = filename.split('-')[0];
    
    // Look for files with the same timestamp
    const matchingFile = availableFiles.find(file => 
      file.startsWith(baseTimestamp)
    );
    
    if (matchingFile) {
      const matchingPath = path.join(uploadsDir, matchingFile);
      return res.sendFile(matchingPath);
    }
  }

  // Get category from query parameter or use default
  const category = req.query.category || 'default';
  const placeholderFile = categoryPlaceholders[category] || categoryPlaceholders.default;
  const placeholderPath = path.join(placeholdersDir, placeholderFile);
  
  // Send placeholder if it exists
  if (fs.existsSync(placeholderPath)) {
    return res.sendFile(placeholderPath);
  }

  // Last resort: send any available image
  const availableFiles = getAvailableFiles();
  if (availableFiles.length > 0) {
    const fallbackPath = path.join(uploadsDir, availableFiles[0]);
    return res.sendFile(fallbackPath);
  }

  // If no images at all, send 404
  res.status(404).json({ error: 'Image not found' });
});

module.exports = router;
