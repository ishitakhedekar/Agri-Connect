import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Paper, Chip, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ChatIcon from '@mui/icons-material/Chat';
import NatureIcon from '@mui/icons-material/Nature';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Home = () => {
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

  const features = [
    ...(isLandowner || !isLoggedIn ? [{
      icon: <AgricultureIcon sx={{ fontSize: 32 }} />,
      title: 'Post Your Land',
      description: 'Have unused agricultural land? List it on AgriConnect in minutes. Add photos, soil details, lease terms, and yield expectations — and let the right farmer find you.',
      link: '/post-land',
      buttonLabel: 'Post Land',
      accent: '#2e7d32',
      light: '#e8f5e9',
      iconBg: '#c8e6c9',
    }] : []),
    {
      icon: <LocationOnIcon sx={{ fontSize: 32 }} />,
      title: 'Browse Lands',
      description: 'Explore hundreds of verified land listings across the country. Filter by location, land type, soil quality, and area to find the perfect plot for your next harvest.',
      link: '/lands',
      buttonLabel: 'Browse Now',
      accent: '#1565c0',
      light: '#e3f2fd',
      iconBg: '#bbdefb',
    },
    {
      icon: <ChatIcon sx={{ fontSize: 32 }} />,
      title: 'Connect Directly',
      description: 'No middlemen, no delays. Chat directly with landowners or farmers, discuss lease terms, negotiate yield splits, and seal the deal — all within the platform.',
      link: isLoggedIn ? '/chat' : '/register',
      buttonLabel: isLoggedIn ? 'Open Chats' : 'Get Started',
      accent: '#6a1b9a',
      light: '#f3e5f5',
      iconBg: '#e1bee7',
    },
  ];

  const steps = [
    {
      icon: <AgricultureIcon sx={{ fontSize: 28, color: '#2e7d32' }} />,
      step: '01', title: 'Landowners Post',
      desc: 'Landowners create a detailed listing for their unused agricultural land — uploading photos, specifying soil type, total area, location, preferred lease duration, and expected yield distribution. The more detail you add, the faster you find the right farmer.',
      color: '#e8f5e9', border: '#a5d6a7',
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: 28, color: '#1565c0' }} />,
      step: '02', title: 'Farmers Browse',
      desc: 'Farmers search and filter through verified listings by location, land type, soil quality, and area size. Each listing shows everything needed to make a confident decision before reaching out — no guesswork, no wasted trips.',
      color: '#e3f2fd', border: '#90caf9',
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 28, color: '#e65100' }} />,
      step: '03', title: 'Connect & Agree',
      desc: 'Both parties chat directly through AgriConnect to discuss expectations, negotiate lease terms, agree on yield splits, and clarify responsibilities. Everything stays on the platform until both sides are fully confident and ready.',
      color: '#fff3e0', border: '#ffcc80',
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 28, color: '#6a1b9a' }} />,
      step: '04', title: 'Cultivate & Grow',
      desc: 'The farmer begins cultivating, the landowner starts earning returns on previously idle land, and a productive long-term partnership takes root. Many of our partnerships run for multiple seasons — built on trust and mutual benefit.',
      color: '#f3e5f5', border: '#ce93d8',
    },
  ];

  return (
    <Box>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)',
        color: 'white',
        py: { xs: 10, md: 14 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Glow blobs */}
        <Box sx={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)', filter: 'blur(40px)' }} />
        <Box sx={{ position: 'absolute', bottom: -60, right: -60, width: 260, height: 260, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)', filter: 'blur(40px)' }} />

        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <Chip
            label="🌱 Sustainable Agriculture Platform"
            sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.12)', color: 'white', fontWeight: 500, border: '1px solid rgba(255,255,255,0.2)' }}
          />
          <Typography sx={{
            fontFamily: '"Georgia", serif',
            fontSize: { xs: '2.4rem', md: '3.8rem' },
            fontWeight: 700, lineHeight: 1.15, mb: 3,
          }}>
            Where Land Meets<br />the Right Farmer
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', width: 60, mx: 'auto', mb: 3 }} />
          <Typography sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            color: 'rgba(255,255,255,0.82)',
            maxWidth: 540, mx: 'auto', lineHeight: 1.9,
          }}>
            AgriConnect bridges the gap between landowners with unused agricultural land
            and farmers ready to cultivate it — creating partnerships that benefit both sides.
          </Typography>

          {/* CTA buttons */}
          <Box sx={{ mt: 5, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Box component={Link} to="/lands" sx={{
              px: 4, py: 1.6, bgcolor: 'white', color: '#1b5e20',
              borderRadius: 2, textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem',
              transition: 'all 0.2s', '&:hover': { bgcolor: '#f1f8e9' },
            }}>
              Browse Lands
            </Box>
            {!isLoggedIn && (
              <Box component={Link} to="/register" sx={{
                px: 4, py: 1.6,
                bgcolor: 'transparent', color: 'white',
                border: '1.5px solid rgba(255,255,255,0.5)',
                borderRadius: 2, textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem',
                transition: 'all 0.2s', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
              }}>
                Join Free
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* ── Feature Cards ─────────────────────────────────────────────── */}
      <Box sx={{ bgcolor: '#fafafa', py: 10, borderBottom: '1px solid #f0f0f0' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Everything You Need</Typography>
            <Typography variant="body1" color="text.secondary">
              Tools and features designed to make land leasing simple and transparent
            </Typography>
            <Box sx={{ width: 48, height: 4, bgcolor: '#2e7d32', borderRadius: 2, mx: 'auto', mt: 2 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={3} alignItems="stretch" sx={{ maxWidth: 1000 }}>
              {features.map((f, i) => (
                <Grid item xs={12} md={4} key={i} sx={{ display: 'flex' }}>
                  <Paper elevation={0} sx={{
                    width: '100%', borderRadius: 3, overflow: 'hidden',
                    border: '1px solid #e0e0e0',
                    display: 'flex', flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: 4 },
                  }}>
                    {/* Coloured top band */}
                    <Box sx={{ height: 6, bgcolor: f.accent }} />
                    <Box sx={{ p: 3.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      {/* Icon badge */}
                      <Box sx={{
                        width: 56, height: 56, borderRadius: 2,
                        bgcolor: f.iconBg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        mb: 2.5, color: f.accent,
                      }}>
                        {f.icon}
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>{f.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85, flexGrow: 1, mb: 3 }}>
                        {f.description}
                      </Typography>
                      <Box component={Link} to={f.link} sx={{
                        display: 'inline-flex', alignItems: 'center', gap: 0.5,
                        color: f.accent, textDecoration: 'none',
                        fontWeight: 700, fontSize: '0.875rem',
                        '&:hover': { gap: 1 }, transition: 'gap 0.2s',
                      }}>
                        {f.buttonLabel} <ArrowForwardIcon sx={{ fontSize: 16 }} />
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <Box sx={{ py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>How It Works</Typography>
            <Typography variant="body1" color="text.secondary">
              From listing to cultivation in four simple steps
            </Typography>
            <Box sx={{ width: 48, height: 4, bgcolor: '#2e7d32', borderRadius: 2, mx: 'auto', mt: 2 }} />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={3} alignItems="stretch" justifyContent="center" sx={{ maxWidth: 1000 }}>
              {steps.map((s, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Paper elevation={0} sx={{
                    p: 3.5, width: '100%', borderRadius: 3, textAlign: 'center',
                    border: `1.5px solid ${s.border}`,
                    bgcolor: s.color,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 },
                  }}>
                    {/* Step number */}
                    <Typography sx={{
                      fontSize: '2.8rem', fontWeight: 800, lineHeight: 1,
                      color: `${s.border}`, opacity: 0.4,
                      fontFamily: '"Georgia", serif', mb: 1.5,
                    }}>
                      {s.step}
                    </Typography>
                    {/* Icon */}
                    <Box sx={{
                      width: 54, height: 54, borderRadius: '50%',
                      bgcolor: 'white', border: `1.5px solid ${s.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mb: 2,
                    }}>
                      {s.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>{s.title}</Typography>
                    <Divider sx={{ width: 32, borderColor: s.border, borderWidth: 2, mb: 1.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.85, flexGrow: 1 }}>
                      {s.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* ── Bottom CTA ────────────────────────────────────────────────── */}
      {!isLoggedIn && (
        <Box sx={{ bgcolor: '#fafafa', borderTop: '1px solid #f0f0f0', py: 10 }}>
          <Container maxWidth="sm">
            <Paper elevation={0} sx={{
              p: { xs: 4, md: 6 }, textAlign: 'center', borderRadius: 3,
              background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
              border: '1px solid #c8e6c9',
            }}>
              <AgricultureIcon sx={{ fontSize: 48, color: '#2e7d32', mb: 2 }} />
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Ready to Get Started?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
                Join thousands of farmers and landowners already using AgriConnect to build
                productive, sustainable partnerships across India.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Box component={Link} to="/register" sx={{
                  px: 4, py: 1.5, bgcolor: '#2e7d32', color: 'white',
                  borderRadius: 2, textDecoration: 'none', fontWeight: 700,
                  '&:hover': { bgcolor: '#1b5e20' },
                }}>
                  Create Account
                </Box>
                <Box component={Link} to="/lands" sx={{
                  px: 4, py: 1.5, bgcolor: 'white', color: '#2e7d32',
                  border: '1.5px solid #a5d6a7',
                  borderRadius: 2, textDecoration: 'none', fontWeight: 700,
                  '&:hover': { bgcolor: '#f1f8e9' },
                }}>
                  Browse Lands
                </Box>
              </Box>
            </Paper>
          </Container>
        </Box>
      )}

    </Box>
  );
};

export default Home;