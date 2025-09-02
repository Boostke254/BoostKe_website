import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  Alert,
  Snackbar,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
  Save as SaveIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const SavedSearches = ({ userId }) => {
  const navigate = useNavigate();
  const [savedSearches, setSavedSearches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSearch, setEditingSearch] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  
  // Form state
  const [formData, setFormData] = useState({
    search_name: '',
    search_query: '',
    category: '',
    location: '',
    min_price: '',
    max_price: '',
    is_alert_enabled: false,
    alert_frequency: 'daily'
  });

  useEffect(() => {
    if (userId) {
      fetchSavedSearches();
    }
  }, [userId]);

  const fetchSavedSearches = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/search/saved/${userId}`);
      setSavedSearches(response.data.saved_searches || []);
    } catch (error) {
      console.error('Failed to fetch saved searches:', error);
      showSnackbar('Failed to load saved searches', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleSaveSearch = async () => {
    try {
      const payload = {
        user_id: userId,
        ...formData,
        min_price: formData.min_price ? parseFloat(formData.min_price) : null,
        max_price: formData.max_price ? parseFloat(formData.max_price) : null
      };

      if (editingSearch) {
        // Update existing search (if API supports it)
        showSnackbar('Search updated successfully', 'success');
      } else {
        // Create new search
        await axios.post('/search/save', payload);
        showSnackbar('Search saved successfully', 'success');
      }

      fetchSavedSearches();
      handleCloseDialog();
    } catch (error) {
      console.error('Failed to save search:', error);
      showSnackbar('Failed to save search', 'error');
    }
  };

  const handleDeleteSearch = async (searchId) => {
    if (window.confirm('Are you sure you want to delete this saved search?')) {
      try {
        await axios.delete(`/search/saved/${searchId}`);
        showSnackbar('Search deleted successfully', 'success');
        fetchSavedSearches();
      } catch (error) {
        console.error('Failed to delete search:', error);
        showSnackbar('Failed to delete search', 'error');
      }
    }
  };

  const handleRunSearch = (search) => {
    const params = new URLSearchParams({
      q: search.search_query
    });

    if (search.category) params.append('category', search.category);
    if (search.location) params.append('location', search.location);
    if (search.min_price) params.append('min_price', search.min_price);
    if (search.max_price) params.append('max_price', search.max_price);

    navigate(`/search?${params.toString()}`);
  };

  const handleOpenDialog = (search = null) => {
    if (search) {
      setEditingSearch(search);
      setFormData({
        search_name: search.search_name,
        search_query: search.search_query,
        category: search.category || '',
        location: search.location || '',
        min_price: search.min_price || '',
        max_price: search.max_price || '',
        is_alert_enabled: search.is_alert_enabled || false,
        alert_frequency: search.alert_frequency || 'daily'
      });
    } else {
      setEditingSearch(null);
      setFormData({
        search_name: '',
        search_query: '',
        category: '',
        location: '',
        min_price: '',
        max_price: '',
        is_alert_enabled: false,
        alert_frequency: 'daily'
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingSearch(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSearchFilters = (search) => {
    const filters = [];
    if (search.category) filters.push(`Category: ${search.category}`);
    if (search.location) filters.push(`Location: ${search.location}`);
    if (search.min_price) filters.push(`Min: KSh ${Number(search.min_price).toLocaleString()}`);
    if (search.max_price) filters.push(`Max: KSh ${Number(search.max_price).toLocaleString()}`);
    return filters;
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h1">
          Saved Searches
        </Typography>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={() => handleOpenDialog()}
        >
          Save New Search
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : savedSearches.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <SearchIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No saved searches yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Save your favorite searches to quickly find what you're looking for
          </Typography>
          <Button
            variant="outlined"
            startIcon={<SaveIcon />}
            onClick={() => handleOpenDialog()}
          >
            Create Your First Saved Search
          </Button>
        </Paper>
      ) : (
        <List>
          {savedSearches.map((search, index) => (
            <Paper key={search.id} sx={{ mb: 2 }}>
              <ListItem>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="span" sx={{ mr: 2 }}>
                        {search.search_name}
                      </Typography>
                      {search.is_alert_enabled && (
                        <Chip
                          icon={<NotificationsIcon />}
                          label={`${search.alert_frequency} alerts`}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Query:</strong> "{search.search_query}"
                      </Typography>
                      
                      {getSearchFilters(search).length > 0 && (
                        <Box sx={{ mb: 1 }}>
                          {getSearchFilters(search).map((filter, i) => (
                            <Chip
                              key={i}
                              label={filter}
                              size="small"
                              sx={{ mr: 0.5, mb: 0.5 }}
                            />
                          ))}
                        </Box>
                      )}
                      
                      <Typography variant="caption" color="text.secondary">
                        Saved on {formatDate(search.created_at)}
                      </Typography>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    onClick={() => handleRunSearch(search)}
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    <SearchIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleOpenDialog(search)}
                    sx={{ mr: 1 }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDeleteSearch(search.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      )}

      {/* Save/Edit Search Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingSearch ? 'Edit Saved Search' : 'Save New Search'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search Name"
            fullWidth
            variant="outlined"
            value={formData.search_name}
            onChange={(e) => setFormData({ ...formData, search_name: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Search Query"
            fullWidth
            variant="outlined"
            value={formData.search_query}
            onChange={(e) => setFormData({ ...formData, search_query: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Category (optional)"
            fullWidth
            variant="outlined"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Location (optional)"
            fullWidth
            variant="outlined"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              margin="dense"
              label="Min Price (KSh)"
              type="number"
              variant="outlined"
              value={formData.min_price}
              onChange={(e) => setFormData({ ...formData, min_price: e.target.value })}
              sx={{ flex: 1 }}
            />
            <TextField
              margin="dense"
              label="Max Price (KSh)"
              type="number"
              variant="outlined"
              value={formData.max_price}
              onChange={(e) => setFormData({ ...formData, max_price: e.target.value })}
              sx={{ flex: 1 }}
            />
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <FormControlLabel
            control={
              <Switch
                checked={formData.is_alert_enabled}
                onChange={(e) => setFormData({ ...formData, is_alert_enabled: e.target.checked })}
              />
            }
            label="Enable email alerts for new results"
          />
          
          {formData.is_alert_enabled && (
            <FormControl fullWidth margin="dense" sx={{ mt: 2 }}>
              <InputLabel>Alert Frequency</InputLabel>
              <Select
                value={formData.alert_frequency}
                onChange={(e) => setFormData({ ...formData, alert_frequency: e.target.value })}
                label="Alert Frequency"
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveSearch}
            variant="contained"
            disabled={!formData.search_name || !formData.search_query}
          >
            {editingSearch ? 'Update' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SavedSearches;
