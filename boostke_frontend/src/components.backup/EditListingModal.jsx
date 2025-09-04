import { useState, useEffect } from 'react';
import { Modal, Button, TextField, CircularProgress, Chip, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import DeleteIcon from '@mui/icons-material/Delete';
import { productCategories } from './Categories';  // Import the categories list
import { counties } from './Counties';  // Import the counties list
import { BASE_URL } from '../api/axios';

const EditListingModal = ({ listing, open, onClose, refreshListings }) => {  
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState(listing.title);
  const [description, setDescription] = useState(listing.description);
  const [price, setPrice] = useState(listing.price);
  const [category, setCategory] = useState(listing.category);
  const [location, setLocation] = useState(listing.location);  // Location will also serve as county
  const [isAvailable, setIsAvailable] = useState(listing.is_available);
  const [images, setImages] = useState([]); // Track uploaded images
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listing) {
      setTitle(listing.title);
      setDescription(listing.description);
      setPrice(listing.price);
      setCategory(listing.category);
      setLocation(listing.location);  // Set the location (county)
      setIsAvailable(listing.is_available);
      setImages(listing.photos || []); // Include existing images
    }
  }, [listing]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Add new files to existing images
  };

  const handleImageDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('location', location);  // Use location as county
    formData.append('is_available', isAvailable);
    
    // // Include both the new images and the existing ones (if any)
    images.forEach((image) => {
      if (image instanceof File) {
        formData.append('photos', image);  // Append new images from the file input
      }
    //   // If the image is an existing URL or path, it should be sent as a string (no need to handle as file)
      else {
        formData.append('photos', image); // Ensure the existing images are included
      }
    });

    try {
      const response = await axiosPrivate.put(`/user/update/listings/${listing.listing_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Listing updated successfully!');
      refreshListings(); // Re-fetch listings
      onClose(); // Close modal
    } catch (error) {
      console.error('Error updating listing:', error);
      alert('Failed to update listing!');
    } finally {
      setLoading(false);
    }
  };


  const getPhotoUrl = (photo) => {
    // If the photo already starts with 'http', return as is
    if (photo.startsWith("http")) {
      return photo;
    }
    // Otherwise, prepend the base URL
    return `${BASE_URL}${photo}`;
  };


  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-container">
        <h3>Edit Listing</h3>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            required
            margin="normal"
          />
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            type="number"
            required
            margin="normal"
          />

          {/* Category Dropdown */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              {productCategories.map((cat, index) => (
                <MenuItem key={index} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Location Dropdown (as County) */}
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Location</InputLabel>
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              label="Location"
            >
              {counties.map((countyName, index) => (
                <MenuItem key={index} value={countyName}>
                  {countyName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div>
            <label style={{ color: 'black' }}>
              Available:
              <input
                type="checkbox"
                checked={isAvailable}
                onChange={(e) => setIsAvailable(e.target.checked)}
              />
            </label>
          </div>

          {/* Image Upload Section with Chips */}
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {images.length > 0 && (
              <div>
                <h4>Selected Images:</h4>
                <Stack direction="row" spacing={1} flexWrap="wrap">
                  {images.map((image, index) => {
                    const imageUrl = image instanceof File ? URL.createObjectURL(image) : image;

                    return (
                      <Chip
                        key={index}
                        label={
                          <img
                            src={getPhotoUrl(imageUrl)}
                            alt={`preview-${index}`}
                            width="80"
                            height="80"
                            style={{
                              borderRadius: '4px',
                              objectFit: 'cover',
                            }}
                          />
                        }
                        onDelete={() => handleImageDelete(index)}
                        deleteIcon={<DeleteIcon />}
                        variant="outlined"
                        style={{
                          margin: '5px',
                          height: '100px',
                          width: '120px',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      />
                    );
                  })}
                </Stack>
              </div>
            )}
          </div>

          <div>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button type="submit" variant="contained" color="warning" fullWidth>
                Update Listing
              </Button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditListingModal;
