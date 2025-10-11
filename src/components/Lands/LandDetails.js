import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Link as MuiLink,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { useLands } from '../../contexts/LandContext';

const LandDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lands } = useLands();
  const [land, setLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user?.token) {
      navigate('/login');
      return;
    }
    // Auth passed, loading remains true until data is ready
  }, [navigate]);

  useEffect(() => {
    if (!id) return;

    const foundLand = lands.find(l => l.id === parseInt(id));
    if (foundLand) {
      setLand(foundLand);
      setError('');
      setLoading(false);
    } else if (lands.length > 0) {
      setError('Land not found');
      setLand(null);
      setLoading(false);
    }
    // If lands.length === 0, keep loading true to show spinner
  }, [lands, id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/lands')}>
            Back to Browse Lands
          </Button>
        </Box>
      </Container>
    );
  }

  if (!land) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate('/lands')}
        sx={{ mb: 3 }}
      >
        Back to Browse Lands
      </Button>
      <Typography variant="h4" gutterBottom>
        {land.title}
      </Typography>

      {land.imageUrl && (
        <CardMedia
          component="img"
          height="300"
          image={land.imageUrl}
          alt={land.title}
          sx={{ borderRadius: 2, mb: 3 }}
        />
      )}

      {/* Basic Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <Typography variant="body1" paragraph>
            {land.description}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {land.location}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AgricultureIcon sx={{ mr: 1, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              Area: {land.area} sq ft
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Chip label={`Land Type: ${land.landType}`} color="primary" size="small" />
            <Chip label={`Soil Type: ${land.soilType}`} color="secondary" size="small" />
          </Box>
        </CardContent>
      </Card>

      {/* Lease Details */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Lease Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Lease Duration: {land.leaseDuration || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body2" color="text.secondary">
                Yield Distribution: {land.yieldDistribution || 'N/A'}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography variant="body2" color="text.secondary">
                Contact Name: {land.contactName || 'N/A'}
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary">
                  {land.contactPhone || 'N/A'}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                <MuiLink href={`mailto:${land.contactEmail}`} underline="hover">
                  {land.contactEmail || 'N/A'}
                </MuiLink>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Chip
        label={land.status || 'Available'}
        color={land.status === 'available' ? 'success' : 'warning'}
        size="large"
        sx={{ mb: 2 }}
      />
    </Container>
  );
};

export default LandDetails;
