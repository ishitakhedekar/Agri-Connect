import React, { useState } from 'react';
import { useLands } from '../../contexts/LandContext';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Alert
} from '@mui/material';

const PostLand = () => {
  const { addLand } = useLands();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    area: '',
    price: '',
    landType: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    imageUrl: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const landTypes = [
    'Agricultural',
    'Residential',
    'Commercial',
    'Industrial',
    'Mixed Use',
    'Farm Land',
    'Orchard',
    'Pasture Land'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.area || formData.area <= 0) newErrors.area = 'Valid area is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Valid price is required';
    if (!formData.landType) newErrors.landType = 'Land type is required';
    if (!formData.contactName.trim()) newErrors.contactName = 'Contact name is required';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = 'Contact phone is required';
    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Valid email is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // Add the new land to the context
      addLand(formData);
      
      // Reset form on success
      setFormData({
        title: '',
        description: '',
        location: '',
        area: '',
        price: '',
        landType: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        imageUrl: ''
      });
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Post New Land
      </Typography>
      <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
        Fill in the details below to list your land for sale or lease
      </Typography>

      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Land posted successfully! Your listing will be reviewed and published shortly.
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={3}>
            {/* Basic Information */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Basic Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Land Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={errors.title}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.landType} required>
                <InputLabel>Land Type</InputLabel>
                <Select
                  name="landType"
                  value={formData.landType}
                  onChange={handleChange}
                  label="Land Type"
                >
                  {landTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Describe your land, its features, and any special characteristics..."
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                error={!!errors.location}
                helperText={errors.location}
                placeholder="City, State, Country"
                required
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Area (sq ft)"
                name="area"
                value={formData.area}
                onChange={handleChange}
                error={!!errors.area}
                helperText={errors.area}
                required
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                type="number"
                label="Price ($)"
                name="price"
                value={formData.price}
                onChange={handleChange}
                error={!!errors.price}
                helperText={errors.price}
                required
              />
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Contact Information
              </Typography>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Contact Name"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                error={!!errors.contactName}
                helperText={errors.contactName}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Phone Number"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
                required
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="email"
                label="Email Address"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
                required
              />
            </Grid>

            {/* Additional Information */}
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Additional Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Image URL (Optional)"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/land-image.jpg"
                helperText="Provide a URL to an image of your land"
              />
            </Grid>

            <Grid item xs={12} sx={{ mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Posting...' : 'Post Land'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostLand;
