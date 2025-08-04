import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const BrowseLands = () => {
  const [lands, setLands] = useState([]);
  const [filteredLands, setFilteredLands] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    soilType: '',
    minArea: '',
    maxArea: '',
  });

  // Sample data - replace with API calls
  const sampleLands = [
    {
      id: 1,
      title: 'Fertile Land in Punjab',
      location: 'Ludhiana, Punjab',
      area: 5.5,
      soilType: 'Alluvial',
      description: 'Rich fertile land perfect for wheat and rice cultivation',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
      status: 'available',
    },
    {
      id: 2,
      title: 'Organic Farm Land',
      location: 'Nashik, Maharashtra',
      area: 3.2,
      soilType: 'Black',
      description: 'Ideal for grape cultivation and organic farming',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400',
      status: 'available',
    },
    {
      id: 3,
      title: 'Hillside Agricultural Land',
      location: 'Coorg, Karnataka',
      area: 8.0,
      soilType: 'Laterite',
      description: 'Perfect for coffee and spice plantation',
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400',
      status: 'available',
    },
  ];

  useEffect(() => {
    setLands(sampleLands);
    setFilteredLands(sampleLands);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let filtered = lands;
    
    if (filters.location) {
      filtered = filtered.filter(land => 
        land.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.soilType) {
      filtered = filtered.filter(land => land.soilType === filters.soilType);
    }
    
    if (filters.minArea) {
      filtered = filtered.filter(land => land.area >= parseFloat(filters.minArea));
    }
    
    if (filters.maxArea) {
      filtered = filtered.filter(land => land.area <= parseFloat(filters.maxArea));
    }
    
    setFilteredLands(filtered);
  };

  const soilTypes = ['Alluvial', 'Black', 'Red', 'Laterite', 'Desert', 'Mountain'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Browse Available Lands
      </Typography>
      
      {/* Filters */}
      <Box sx={{ mb: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Filter Lands
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Enter city or state"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Soil Type</InputLabel>
              <Select
                name="soilType"
                value={filters.soilType}
                onChange={handleFilterChange}
                label="Soil Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {soilTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Min Area (acres)"
              name="minArea"
              type="number"
              value={filters.minArea}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField
              fullWidth
              label="Max Area (acres)"
              name="maxArea"
              type="number"
              value={filters.maxArea}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              onClick={applyFilters}
              sx={{ height: '56px' }}
            >
              Apply Filters
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Lands Grid */}
      <Grid container spacing={4}>
        {filteredLands.map((land) => (
          <Grid item xs={12} md={6} lg={4} key={land.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={land.image}
                alt={land.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {land.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOnIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2" color="text.secondary">
                    {land.location}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AgricultureIcon sx={{ mr: 1, fontSize: 16 }} />
                  <Typography variant="body2" color="text.secondary">
                    {land.area} acres • {land.soilType} soil
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {land.description}
                </Typography>
                <Chip
                  label={land.status}
                  color={land.status === 'available' ? 'success' : 'warning'}
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to={`/lands/${land.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination count={3} color="primary" />
      </Box>
    </Container>
  );
};

export default BrowseLands;
