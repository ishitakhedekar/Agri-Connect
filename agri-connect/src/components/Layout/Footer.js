import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2e7d32',
        color: 'white',
        py: 3,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              AgriConnect
            </Typography>
            <Typography variant="body2">
              Connecting farmers with landowners for sustainable agriculture.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/lands" color="inherit" display="block" sx={{ mb: 1 }}>
              Browse Lands
            </Link>
            <Link href="/post-land" color="inherit" display="block" sx={{ mb: 1 }}>
              Post Land
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: info@agriconnect.com
            </Typography>
            <Typography variant="body2">
              Phone: +1 (555) 123-4567
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: 1, borderColor: 'rgba(255,255,255,0.2)', mt: 3, pt: 2 }}>
          <Typography variant="body2" align="center">
            © 2024 AgriConnect. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
