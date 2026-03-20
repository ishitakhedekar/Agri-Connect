import React from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Typography, Box, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Not logged in — redirect to login
  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (requiredRole && user.role !== requiredRole) {
    return (
      <Container sx={{ mt: 8, textAlign: 'center' }}>
        <LockIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
        <Typography variant="h5" gutterBottom fontWeight="bold">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          This page is only accessible to <strong>{requiredRole}s</strong>.<br />
          You are logged in as a <strong>{user.role}</strong>.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button variant="contained" component={Link} to="/dashboard">
            Go to Dashboard
          </Button>
          <Button variant="outlined" component={Link} to="/">
            Go Home
          </Button>
        </Box>
      </Container>
    );
  }

  return children;
};

export default ProtectedRoute;