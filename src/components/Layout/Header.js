import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Drawer, List, ListItem, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const handleUserUpdated = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserRole(user.role);
        setIsLoggedIn(true);
      } else {
        setUserRole(null);
        setIsLoggedIn(false);
      }
    };
    window.addEventListener('userUpdated', handleUserUpdated);
    return () => window.removeEventListener('userUpdated', handleUserUpdated);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserRole(null);
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { label: 'Home', to: '/', show: true },
    { label: 'Dashboard', to: '/dashboard', show: isLoggedIn },
    { label: 'Browse Lands', to: '/lands', show: isLoggedIn },
    { label: 'Post Land', to: '/post-land', show: userRole === 'landowner' },
    { label: 'Chats', to: '/chat', show: isLoggedIn },
    { label: 'About', to: '/about', show: true },
    { label: 'Profile', to: '/profile', show: isLoggedIn },
  ].filter(l => l.show);

  const NavLink = ({ to, label, onClick }) => (
    <Box
      component={Link}
      to={to}
      onClick={onClick}
      sx={{
        position: 'relative',
        textDecoration: 'none',
        color: isActive(to) ? '#fff' : 'rgba(255,255,255,0.78)',
        fontSize: '0.875rem',
        fontWeight: isActive(to) ? 700 : 500,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        px: 0.5,
        py: 0.5,
        transition: 'color 0.2s',
        '&:hover': { color: '#fff' },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: -2,
          left: 0,
          right: 0,
          height: '2px',
          borderRadius: '2px',
          bgcolor: '#a5d6a7',
          transform: isActive(to) ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform 0.25s ease',
        },
        '&:hover::after': { transform: 'scaleX(1)' },
      }}
    >
      {label}
    </Box>
  );

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1100,
          background: scrolled
            ? 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)'
            : 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.06)'
            : '0 2px 12px rgba(0,0,0,0.10)',
          transition: 'box-shadow 0.3s ease',
          // Subtle grain texture overlay
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
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, md: 4 },
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <AgricultureIcon sx={{ fontSize: 32, color: '#a5d6a7' }} />
            <Box>
              <Typography
                sx={{
                  color: '#fff',
                  fontFamily: '"Georgia", serif',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '-0.01em',
                }}
              >
                AgriConnect
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.55)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  lineHeight: 1,
                  mt: 0.3,
                }}
              >
                Land · Farmers · Growth
              </Typography>
            </Box>
          </Box>

          {/* Desktop Nav */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 3,
            }}
          >
            {navLinks.map(link => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))}

            {/* Auth button */}
            {isLoggedIn ? (
              <Box
                onClick={handleLogout}
                sx={{
                  ml: 1,
                  px: 2.5,
                  py: 0.8,
                  borderRadius: '6px',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    borderColor: 'rgba(255,255,255,0.6)',
                    color: '#fff',
                  },
                }}
              >
                Logout
              </Box>
            ) : (
              <Box
                component={Link}
                to="/login"
                sx={{
                  ml: 1,
                  px: 2.5,
                  py: 0.8,
                  borderRadius: '6px',
                  bgcolor: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.3)',
                  color: '#fff',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.25)',
                    borderColor: 'rgba(255,255,255,0.6)',
                  },
                }}
              >
                Login
              </Box>
            )}
          </Box>

          {/* Mobile hamburger */}
          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(160deg, #1b5e20 0%, #2e7d32 100%)',
            color: '#fff',
          }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontFamily: '"Georgia", serif', fontWeight: 700, fontSize: '1.1rem' }}>
            AgriConnect
          </Typography>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fff' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)' }} />
        <List sx={{ pt: 1 }}>
          {navLinks.map(link => (
            <ListItem key={link.to} disablePadding>
              <Box
                component={Link}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                sx={{
                  width: '100%',
                  px: 3,
                  py: 1.5,
                  textDecoration: 'none',
                  color: isActive(link.to) ? '#a5d6a7' : 'rgba(255,255,255,0.85)',
                  fontWeight: isActive(link.to) ? 700 : 400,
                  fontSize: '0.95rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  display: 'block',
                  '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                }}
              >
                {link.label}
              </Box>
            </ListItem>
          ))}
          <Divider sx={{ borderColor: 'rgba(255,255,255,0.15)', my: 1 }} />
          <ListItem disablePadding>
            <Box
              onClick={() => { handleLogout(); setMobileOpen(false); }}
              sx={{
                width: '100%', px: 3, py: 1.5,
                color: 'rgba(255,255,255,0.6)',
                fontSize: '0.95rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                '&:hover': { color: '#fff' },
              }}
            >
              {isLoggedIn ? 'Logout' : ''}
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;