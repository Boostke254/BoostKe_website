const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('../../db');

const router = express.Router();

// Serve image as blob data
router.get('/blob/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    const uploadsDir = path.join(__dirname, '../../uploads');
    let filePath = null;

    // First, try to find the exact file
    const exactPath = path.join(uploadsDir, filename);
    if (fs.existsSync(exactPath)) {
      filePath = exactPath;
    } else {
      // If filename includes 'blob', try to find a matching file
      if (filename.includes('blob')) {
        const baseTimestamp = filename.split('-')[0];
        const files = fs.readdirSync(uploadsDir).filter(file => 
          file.match(/\.(jpg|jpeg|png|gif|webp)$/i) && file.startsWith(baseTimestamp)
        );
        
        if (files.length > 0) {
          filePath = path.join(uploadsDir, files[0]);
        }
      }

      // If still no file found, try to extract timestamp and find similar files
      if (!filePath) {
        const timestampMatch = filename.match(/^(\d+)/);
        if (timestampMatch) {
          const timestamp = timestampMatch[1];
          const files = fs.readdirSync(uploadsDir).filter(file => 
            file.match(/\.(jpg|jpeg|png|gif|webp)$/i) && file.startsWith(timestamp)
          );
          
          if (files.length > 0) {
            filePath = path.join(uploadsDir, files[0]);
          }
        }
      }
    }

    if (!filePath || !fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Read the file and send as blob
    const fileBuffer = fs.readFileSync(filePath);
    const fileExtension = path.extname(filePath).toLowerCase();
    
    // Set appropriate content type
    let contentType = 'application/octet-stream';
    switch (fileExtension) {
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
    }

    res.set({
      'Content-Type': contentType,
      'Content-Length': fileBuffer.length,
      'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      'Access-Control-Allow-Origin': '*'
    });

    res.send(fileBuffer);

  } catch (error) {
    console.error('Error serving image blob:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all available images with metadata
router.get('/available', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const files = fs.readdirSync(uploadsDir).filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    const imageList = files.map(file => {
      const filePath = path.join(uploadsDir, file);
      const stats = fs.statSync(filePath);
      const timestamp = file.split('-')[0];
      
      return {
        filename: file,
        timestamp: timestamp,
        size: stats.size,
        created: stats.birthtime,
        url: `/images/blob/${file}`
      };
    });

    res.json({
      message: 'Available images fetched successfully',
      images: imageList,
      total: imageList.length
    });

  } catch (error) {
    console.error('Error fetching available images:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fix shop logos to use existing images
router.post('/fix-shop-logos', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const availableFiles = fs.readdirSync(uploadsDir).filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // Get all shops with problematic logo URLs
    const shopsResult = await pool.query(`
      SELECT shop_id, shop_logo, shop_name 
      FROM shops 
      WHERE shop_logo LIKE '%blob%' OR shop_logo LIKE '%localhost%'
    `);

    const updates = [];

    for (const shop of shopsResult.rows) {
      let newLogoUrl = null;
      
      // Extract timestamp from current logo URL
      const urlMatch = shop.shop_logo.match(/uploads\/(\d+)/);
      if (urlMatch) {
        const timestamp = urlMatch[1];
        
        // Find matching file
        const matchingFile = availableFiles.find(file => file.startsWith(timestamp));
        if (matchingFile) {
          newLogoUrl = `/images/blob/${matchingFile}`;
          
          await pool.query(
            'UPDATE shops SET shop_logo = $1 WHERE shop_id = $2',
            [newLogoUrl, shop.shop_id]
          );

          updates.push({
            shop_id: shop.shop_id,
            shop_name: shop.shop_name,
            old_logo: shop.shop_logo,
            new_logo: newLogoUrl,
            matched_file: matchingFile
          });
        }
      }
    }

    res.json({
      message: 'Shop logos updated successfully',
      updates: updates,
      total_updated: updates.length
    });

  } catch (error) {
    console.error('Error fixing shop logos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fix listings photos to use existing images
router.post('/fix-listings-photos', async (req, res) => {
  try {
    const uploadsDir = path.join(__dirname, '../../uploads');
    const availableFiles = fs.readdirSync(uploadsDir).filter(file => 
      file.match(/\.(jpg|jpeg|png|gif|webp)$/i)
    );

    // Get all listings with photo arrays
    const listingsResult = await pool.query(`
      SELECT listing_id, photos, title 
      FROM listings 
      WHERE photos IS NOT NULL AND array_length(photos, 1) > 0
    `);

    const updates = [];

    for (const listing of listingsResult.rows) {
      let updatedPhotos = [];
      let hasChanges = false;

      for (const photoUrl of listing.photos) {
        if (photoUrl.includes('localhost') || photoUrl.includes('blob')) {
          const urlMatch = photoUrl.match(/uploads\/(\d+)/);
          if (urlMatch) {
            const timestamp = urlMatch[1];
            const matchingFile = availableFiles.find(file => file.startsWith(timestamp));
            
            if (matchingFile) {
              updatedPhotos.push(`/images/blob/${matchingFile}`);
              hasChanges = true;
            } else {
              updatedPhotos.push(photoUrl); // Keep original if no match found
            }
          } else {
            updatedPhotos.push(photoUrl);
          }
        } else {
          updatedPhotos.push(photoUrl);
        }
      }

      if (hasChanges) {
        await pool.query(
          'UPDATE listings SET photos = $1 WHERE listing_id = $2',
          [updatedPhotos, listing.listing_id]
        );

        updates.push({
          listing_id: listing.listing_id,
          title: listing.title,
          old_photos: listing.photos,
          new_photos: updatedPhotos
        });
      }
    }

    res.json({
      message: 'Listing photos updated successfully',
      updates: updates,
      total_updated: updates.length
    });

  } catch (error) {
    console.error('Error fixing listing photos:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
