import React from 'react';
import {
  Container, Box, Typography, Grid, Card, CardContent,
  Divider, Paper,
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import HandshakeIcon from '@mui/icons-material/Handshake';
import NatureIcon from '@mui/icons-material/Nature';
import GroupsIcon from '@mui/icons-material/Groups';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import VerifiedIcon from '@mui/icons-material/Verified';
import LandscapeIcon from '@mui/icons-material/Landscape';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

// Reusable section heading
const SectionHeading = ({ title, subtitle }) => (
  <Box sx={{ textAlign: 'center', mb: 5 }}>
    <Typography variant="h4" fontWeight="bold" gutterBottom>{title}</Typography>
    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
      {subtitle}
    </Typography>
    <Box sx={{ width: 48, height: 4, bgcolor: '#2e7d32', borderRadius: 2, mx: 'auto', mt: 2 }} />
  </Box>
);

const AboutUs = () => {
  const features = [
    { icon: <LandscapeIcon />, title: 'Land Listings', desc: 'Browse detailed listings complete with soil quality, water access, total area, lease duration, yield distribution, and exact location — everything you need to make a confident decision before reaching out to a landowner.' },
    { icon: <VerifiedIcon />, title: 'Secure Connections', desc: 'Every profile is verified. Our built-in messaging lets landowners and farmers communicate directly and securely without sharing personal contact details until both parties are comfortable and ready.' },
    { icon: <AssignmentIcon />, title: 'Flexible Agreements', desc: 'Whether you need a single-season arrangement or a multi-year partnership, AgriConnect supports all leasing structures. Discuss terms, yield splits, and responsibilities directly through the platform.' },
    { icon: <SupportAgentIcon />, title: 'Community Support', desc: 'You are never alone. Connect with experienced farmers, get guidance from landowners who have been through the process, and tap into a growing community that gets stronger with every new member.' },
  ];

  const values = [
    { icon: <NatureIcon />, label: 'Sustainability', desc: 'We are committed to farming practices that protect soil health, conserve water, and preserve the environment for generations of farmers yet to come.' },
    { icon: <VerifiedIcon />, label: 'Transparency', desc: 'Every listing, message, and agreement on AgriConnect is built on honesty. Clear and open communication is the foundation of every successful partnership on our platform.' },
    { icon: <GroupsIcon />, label: 'Community', desc: 'Agriculture thrives when people work together. We foster a welcoming space where landowners and farmers treat each other as long-term partners, not just one-time counterparts.' },
    { icon: <LightbulbIcon />, label: 'Innovation', desc: 'We use modern technology to solve problems that have challenged farmers and landowners for decades — making it easier than ever to find the right land or the right person to farm it.' },
    { icon: <HandshakeIcon />, label: 'Empowerment', desc: 'We give farmers access to land they could never find on their own, and give landowners a way to make unused property productive. Both sides leave the platform stronger than before.' },
  ];

  return (
    <Box>

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <Box sx={{
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)',
        color: 'white',
        py: { xs: 8, md: 10 },
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          <AgricultureIcon sx={{ fontSize: 52, color: '#a5d6a7', mb: 2 }} />
          <Typography sx={{
            fontFamily: '"Georgia", serif',
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 700, lineHeight: 1.2, mb: 2,
          }}>
            About AgriConnect
          </Typography>
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)', width: 60, mx: 'auto', mb: 2 }} />
          <Typography sx={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}>
            Bridging the gap between farmers and landowners for a sustainable agricultural future
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">

        {/* ── Mission & Vision ─────────────────────────────────────────── */}
        <Box sx={{ py: 8, borderBottom: '1px solid #f0f0f0' }}>
          <SectionHeading
            title="Who We Are"
            subtitle="Our mission and vision for sustainable agriculture"
          />
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{
                p: 4, height: '100%',
                border: '1px solid #e0e0e0',
                borderTop: '4px solid #2e7d32',
                borderRadius: 3,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <NatureIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">Our Mission</Typography>
                </Box>
                <Divider sx={{ mb: 2.5 }} />
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                  AgriConnect is dedicated to creating meaningful connections between landowners
                  who have unused agricultural land and farmers seeking opportunities to cultivate
                  crops. We believe in promoting sustainable farming practices while maximizing
                  land utilization for the benefit of both parties.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{
                p: 4, height: '100%',
                border: '1px solid #e0e0e0',
                borderTop: '4px solid #66bb6a',
                borderRadius: 3,
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <LightbulbIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
                  </Box>
                  <Typography variant="h6" fontWeight="bold">Our Vision</Typography>
                </Box>
                <Divider sx={{ mb: 2.5 }} />
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.9 }}>
                  We envision a world where no agricultural land goes to waste, where farmers
                  have access to fertile lands, and where landowners can contribute to food
                  security while earning from their unused properties. Through technology and
                  trust, we're building a community that supports sustainable agriculture.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* ── What We Offer ────────────────────────────────────────────── */}
        <Box sx={{ py: 8, borderBottom: '1px solid #f0f0f0' }}>
          <SectionHeading
            title="What We Offer"
            subtitle="Everything you need to connect, communicate, and cultivate"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={3} alignItems="stretch" sx={{ maxWidth: 1000 }}>
              {features.map((f, i) => (
                <Grid item xs={12} sm={6} md={3} key={i} sx={{ display: 'flex' }}>
                  <Paper elevation={0} sx={{
                    p: 3.5, width: '100%', borderRadius: 3,
                    border: '1px solid #e0e0e0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3, borderColor: '#a5d6a7' },
                  }}>
                    <Box sx={{
                      width: 60, height: 60, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                      border: '2px solid #c8e6c9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mb: 2, flexShrink: 0,
                      '& svg': { fontSize: 28, color: '#2e7d32' },
                    }}>
                      {f.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {f.title}
                    </Typography>
                    <Divider sx={{ width: 32, borderColor: '#a5d6a7', borderWidth: 2, mb: 1.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, flexGrow: 1 }}>
                      {f.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ── Our Values ───────────────────────────────────────────────── */}
        <Box sx={{ py: 8, borderBottom: '1px solid #f0f0f0' }}>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do"
          />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={3} alignItems="stretch" sx={{ maxWidth: 900 }}>
              {values.map((v, i) => (
                <Grid item xs={12} sm={6} md={4} key={i} sx={{ display: 'flex' }}>
                  <Paper elevation={0} sx={{
                    p: 3.5, width: '100%', borderRadius: 3,
                    border: '1px solid #e0e0e0',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    textAlign: 'center',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', boxShadow: 3, borderColor: '#a5d6a7' },
                  }}>
                    <Box sx={{
                      width: 60, height: 60, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #e8f5e9, #f1f8e9)',
                      border: '2px solid #c8e6c9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      mb: 2, flexShrink: 0,
                      '& svg': { fontSize: 28, color: '#2e7d32' },
                    }}>
                      {v.icon}
                    </Box>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                      {v.label}
                    </Typography>
                    <Divider sx={{ width: 32, borderColor: '#a5d6a7', borderWidth: 2, mb: 1.5 }} />
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, flexGrow: 1 }}>
                      {v.desc}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* ── Contact CTA ──────────────────────────────────────────────── */}
        <Box sx={{ py: 8 }}>
          <Paper sx={{
            p: { xs: 4, md: 6 }, textAlign: 'center', borderRadius: 3,
            background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)',
            border: '1px solid #c8e6c9',
          }}>
            <Box sx={{
              width: 64, height: 64, borderRadius: '50%',
              bgcolor: '#2e7d32', mx: 'auto', mb: 3,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 30, color: 'white' }} />
            </Box>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Get In Touch</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 420, mx: 'auto' }}>
              Have questions or suggestions? We'd love to hear from you!
            </Typography>
            <Box
              component="a"
              href="mailto:hello@agriconnect.in"
              sx={{
                display: 'inline-block',
                px: 4, py: 1.5,
                bgcolor: '#2e7d32', color: 'white',
                borderRadius: 2, textDecoration: 'none',
                fontWeight: 700, fontSize: '0.95rem',
                transition: 'bgcolor 0.2s',
                '&:hover': { bgcolor: '#1b5e20' },
              }}
            >
              hello@agriconnect.in
            </Box>
          </Paper>
        </Box>

      </Container>
    </Box>
  );
};

export default AboutUs;