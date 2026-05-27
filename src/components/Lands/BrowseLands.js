import React, { useState, useEffect } from 'react';
import {
  Container, Grid, Card, CardContent, CardMedia, Typography,
  Button, Box, Chip, TextField, FormControl, InputLabel,
  Select, MenuItem, Pagination, CircularProgress, Alert,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { useLands } from '../../contexts/LandContext';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600';
const LANDS_PER_PAGE = 6;

const BrowseLands = () => {
  const { lands, refreshLands } = useLands();
  const [filteredLands, setFilteredLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    location: '',
    landType: '',
    minArea: '',
    maxArea: '',
  });

  useEffect(() => {
    const load = async () => {
      await refreshLands();
      setLoading(false);
    };
    load();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setFilteredLands(lands);
    setPage(1);
  }, [lands]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const applyFilters = () => {
    let filtered = [...lands];

    if (filters.location) {
      filtered = filtered.filter(land =>
        land.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    if (filters.landType) {
      filtered = filtered.filter(land => land.landType === filters.landType);
    }
    if (filters.minArea) {
      filtered = filtered.filter(land => parseFloat(land.area) >= parseFloat(filters.minArea));
    }
    if (filters.maxArea) {
      filtered = filtered.filter(land => parseFloat(land.area) <= parseFloat(filters.maxArea));
    }

    setFilteredLands(filtered);
    setPage(1);
  };

  const resetFilters = () => {
    setFilters({ location: '', landType: '', minArea: '', maxArea: '' });
    setFilteredLands(lands);
    setPage(1);
  };

  const landTypes = ['Agricultural', 'Residential', 'Commercial', 'Industrial', 'Mixed Use', 'Farm Land', 'Orchard', 'Pasture Land'];

  const totalPages = Math.ceil(filteredLands.length / LANDS_PER_PAGE);
  const paginatedLands = filteredLands.slice((page - 1) * LANDS_PER_PAGE, page * LANDS_PER_PAGE);

  if (loading) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Browse Available Lands
      </Typography>

      {/* Filters */}
      <Box sx={{ mb: 4, p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>Filter Lands</Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth label="Location" name="location"
              value={filters.location} onChange={handleFilterChange}
              placeholder="City or state"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Land Type</InputLabel>
              <Select name="landType" value={filters.landType} onChange={handleFilterChange} label="Land Type">
                <MenuItem value="">All Types</MenuItem>
                {landTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Min Area (sq ft)" name="minArea" type="number" value={filters.minArea} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} md={2}>
            <TextField fullWidth label="Max Area (sq ft)" name="maxArea" type="number" value={filters.maxArea} onChange={handleFilterChange} />
          </Grid>
          <Grid item xs={12} md={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button fullWidth variant="contained" onClick={applyFilters} sx={{ height: '56px' }}>
                Filter
              </Button>
              <Button fullWidth variant="outlined" onClick={resetFilters} sx={{ height: '56px' }}>
                Reset
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Results count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Showing {paginatedLands.length} of {filteredLands.length} listings
      </Typography>

      {/* Lands Grid */}
      {filteredLands.length === 0 ? (
        <Alert severity="info">No lands found matching your filters.</Alert>
      ) : (
        <Grid container spacing={4}>
          {paginatedLands.map((land) => (
            <Grid item xs={12} md={6} lg={4} key={land._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={land.imageUrl || FALLBACK_IMAGE}
                  alt={land.title}
                  onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h2" fontWeight="bold">
                    {land.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationOnIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {land.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <AgricultureIcon sx={{ mr: 0.5, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {land.area} sq ft · {land.landType}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{
                    mb: 2,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {land.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                    <Chip label={land.landType} color="primary" size="small" />
                    {land.leaseDuration && (
                      <Chip label={land.leaseDuration} size="small" variant="outlined" />
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    fullWidth
                    component={Link}
                    to={`/lands/${land._id}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, val) => setPage(val)}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
};

export default BrowseLands;