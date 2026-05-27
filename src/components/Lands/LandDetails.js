import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Grid, Card, CardContent, CardMedia,
  Box, Chip, Button, CircularProgress, Alert, Divider,
  Link as MuiLink, Paper,
} from '@mui/material';
import { useParams, useNavigate, Link } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartIcon from '@mui/icons-material/BarChart';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800';

const LandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isFarmer = user?.role === 'farmer';

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/lands/${id}`);
        setLand(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load land details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLand();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button variant="contained" onClick={() => navigate('/lands')} sx={{ mt: 2 }}>
          Back to Browse Lands
        </Button>
      </Container>
    );
  }

  if (!land) return null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>

      <Button variant="outlined" onClick={() => navigate('/lands')} sx={{ mb: 3 }}>
        ← Back to Browse Lands
      </Button>

      {/* Hero Image */}
      <CardMedia
        component="img"
        height="350"
        image={land.imageUrl || FALLBACK_IMAGE}
        alt={land.title}
        onError={(e) => { e.target.src = FALLBACK_IMAGE; }}
        sx={{ borderRadius: 2, mb: 3, objectFit: 'cover' }}
      />

      <Grid container spacing={3}>

        {/* Left Column - Main Info */}
        <Grid item xs={12} md={8}>

          {/* Title + chips */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {land.title}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label={land.landType} color="primary" />
              <Chip label="Available" color="success" />
              {land.leaseDuration && (
                <Chip label={`Lease: ${land.leaseDuration}`} variant="outlined" />
              )}
            </Box>
          </Box>

          {/* Description */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>About this Land</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                {land.description}
              </Typography>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <Card variant="outlined" sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Land Details</Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnIcon color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Location</Typography>
                      <Typography variant="body2" fontWeight="bold">{land.location}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AgricultureIcon color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Area</Typography>
                      <Typography variant="body2" fontWeight="bold">{land.area} sq ft</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Lease Duration</Typography>
                      <Typography variant="body2" fontWeight="bold">{land.leaseDuration || 'N/A'}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <BarChartIcon color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">Yield Distribution</Typography>
                      <Typography variant="body2" fontWeight="bold">{land.yieldDistribution || 'N/A'}</Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Contact */}
        <Grid item xs={12} md={4}>
          <Card variant="outlined" sx={{ position: 'sticky', top: 16 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>Contact Information</Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <PersonIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">Contact Name</Typography>
                  <Typography variant="body2" fontWeight="bold">{land.contactName || 'N/A'}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">Phone</Typography>
                  <Typography variant="body2" fontWeight="bold">{land.contactPhone || 'N/A'}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="text.secondary">Email</Typography>
                  <MuiLink href={`mailto:${land.contactEmail}`} underline="hover">
                    <Typography variant="body2" fontWeight="bold">{land.contactEmail || 'N/A'}</Typography>
                  </MuiLink>
                </Box>
              </Box>

              {/* Contact button for farmers */}
              {isFarmer && land.owner?._id && (
                <Button
                  variant="contained"
                  fullWidth
                  component={Link}
                  to={`/chat/${land.owner._id}`}
                  size="large"
                >
                  Contact Landowner
                </Button>
              )}

              {/* Posted by */}
              {land.owner?.name && (
                <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2, textAlign: 'center' }}>
                  Posted by {land.owner.name}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LandDetails;