import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Header = () => {
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserRole(null);
    setIsLoggedIn(false);
    window.location.reload(); // Reload to update navbar
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#2e7d32' }}>
      <Toolbar>
        <AgricultureIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AgriConnect
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {(userRole === 'farmer' || userRole === 'landowner') && (
            <Button color="inherit" component={Link} to="/lands">
              Browse Lands
            </Button>
          )}
          {userRole === 'landowner' && (
            <Button color="inherit" component={Link} to="/post-land">
              Post Land
            </Button>
          )}
          <Button color="inherit" component={Link} to="/about">
            About Us
          </Button>
          {isLoggedIn && (
            <Button color="inherit" component={Link} to="/profile">
              Profile
            </Button>
          )}
          {isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
