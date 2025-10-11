import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
          Please login to view your dashboard.
        </Typography>
        <Box textAlign="center" sx={{ mt: 2 }}>
          <Button variant="contained" component={Link} to="/login">
            Login
          </Button>
        </Box>
      </Container>
    );
  }
  
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name || user.email}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Role: {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'}
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {user.role === 'landowner' && (
          <>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Your Land Posts</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    View and manage your posted lands.
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/post-land"
                    sx={{ mt: 2 }}
                  >
                    Post New Land
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Messages</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    View messages from interested farmers.
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/chat"
                    sx={{ mt: 2 }}
                  >
                    View Chats
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}

        {user.role === 'farmer' && (
          <>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Browse Lands</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Find lands available for cultivation.
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/lands"
                    sx={{ mt: 2 }}
                  >
                    Browse Lands
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Messages</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    View messages from landowners.
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    to="/chat"
                    sx={{ mt: 2 }}
                  >
                    View Chats
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
