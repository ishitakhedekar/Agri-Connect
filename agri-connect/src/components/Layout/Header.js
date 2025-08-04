import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';

const Header = () => {
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
          <Button color="inherit" component={Link} to="/lands">
            Browse Lands
          </Button>
          <Button color="inherit" component={Link} to="/post-land">
            Post Land
          </Button>
          <Button color="inherit" component={Link} to="/profile">
            Profile
          </Button>
          <Button color="inherit" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
