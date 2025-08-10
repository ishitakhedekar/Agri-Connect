import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';

const Home = () => {
  const features = [
    {
      icon: <AgricultureIcon sx={{ fontSize: 60, color: '#2e7d32' }} />,
      title: 'Post Your Land',
      description: 'Share details about your barren land and connect with farmers',
      link: '/post-land',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 60, color: '#2e7d32' }} />,
      title: 'Browse Lands',
      description: 'Find suitable agricultural lands for cultivation',
      link: '/lands',
    },
    {
      icon: <ChatIcon sx={{ fontSize: 60, color: '#2e7d32' }} />,
      title: 'Direct Communication',
      description: 'Chat directly with landowners and farmers',
      link: '/dashboard',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          Welcome to AgriConnect
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" paragraph>
          Connecting landowners with farmers to utilize barren agricultural lands
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/lands"
          sx={{ mr: 2, mb: 2 }}
        >
          Browse Lands
        </Button>
        <Button
          variant="outlined"
          size="large"
          component={Link}
          to="/post-land"
          sx={{ mb: 2 }}
        >
          Post Your Land
        </Button>
      </Box>

      <Grid container spacing={4} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ height: '100%', textAlign: 'center', p: 2 }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h5" component="h3" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {feature.description}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  component={Link}
                  to={feature.link}
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ textAlign: 'center', py: 4, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <Typography variant="h4" component="h2" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">1. Landowners Post</Typography>
            <Typography variant="body2">
              Share details about your barren agricultural land
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">2. Farmers Browse</Typography>
            <Typography variant="body2">
              Find suitable lands for cultivation
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6">3. Connect & Cultivate</Typography>
            <Typography variant="body2">
              Communicate directly and start farming
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
