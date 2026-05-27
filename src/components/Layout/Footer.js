import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Footer = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUpdate = () => {
      const u = localStorage.getItem('user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('userUpdated', handleUpdate);
    return () => window.removeEventListener('userUpdated', handleUpdate);
  }, []);

  const isLandowner = user?.role === 'landowner';
  const isLoggedIn = !!user;

  const linkStyle = {
    color: 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    display: 'block',
    mb: 1.2,
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    fontWeight: 500,
    transition: 'color 0.2s',
    '&:hover': { color: '#a5d6a7' },
  };

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)',
        color: 'white',
        pt: 5,
        pb: 2,
        mt: 'auto',
        position: 'relative',
        // Same grain texture as header
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.4,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid container spacing={4}>

          {/* Brand */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.5 }}>
              <AgricultureIcon sx={{ fontSize: 30, color: '#a5d6a7' }} />
              <Box>
                <Typography sx={{
                  fontFamily: '"Georgia", serif',
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}>
                  AgriConnect
                </Typography>
                <Typography sx={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  mt: 0.3,
                }}>
                  Land · Farmers · Growth
                </Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, fontSize: '0.82rem' }}>
              Bridging the gap between landowners and farmers to cultivate a more sustainable agricultural future.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a5d6a7',
              mb: 2,
            }}>
              Quick Links
            </Typography>
            <Box component={Link} to="/" sx={linkStyle}>Home</Box>
            <Box component={Link} to="/lands" sx={linkStyle}>Browse Lands</Box>
            {(isLandowner || !isLoggedIn) && (
              <Box component={Link} to="/post-land" sx={linkStyle}>Post Land</Box>
            )}
            {isLoggedIn && (
              <Box component={Link} to="/dashboard" sx={linkStyle}>Dashboard</Box>
            )}
            {isLoggedIn && (
              <Box component={Link} to="/chat" sx={linkStyle}>Chats</Box>
            )}
            <Box component={Link} to="/about" sx={linkStyle}>About Us</Box>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{
              fontWeight: 700,
              fontSize: '0.7rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#a5d6a7',
              mb: 2,
            }}>
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.2 }}>
              <EmailIcon sx={{ fontSize: 15, color: '#a5d6a7' }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                hello@agriconnect.in
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1.2 }}>
              <PhoneIcon sx={{ fontSize: 15, color: '#a5d6a7' }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                +91 00000 00000
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <LocationOnIcon sx={{ fontSize: 15, color: '#a5d6a7' }} />
              <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem' }}>
                123, Green Valley Road, India
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)', mt: 4, mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', letterSpacing: '0.03em' }}>
            © {new Date().getFullYear()} AgriConnect. All rights reserved.
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem' }}>
            Made with 🌱 for farmers & landowners
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;