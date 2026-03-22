import React, { useState } from 'react';
import {
  Paper, TextField, Button, Typography, Box, Container, Alert, Divider,
} from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/login`, formData);
      const userData = data.user || data;
      const fullUser = { ...userData, email: formData.email, token: data.token };
      localStorage.setItem('user', JSON.stringify(fullUser));
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f1f8e9 0%, #e8f5e9 50%, #fafafa 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      py: 6,
    }}>
      <Container maxWidth="xs">

        <Paper elevation={0} sx={{
          borderRadius: 4, overflow: 'hidden',
          border: '1px solid #e0e0e0',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
        }}>

          {/* Green header band */}
          <Box sx={{
            background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
            px: 4, py: 3, textAlign: 'center',
          }}>
            <Typography sx={{
              color: 'white', fontWeight: 700, fontSize: '1.3rem',
              fontFamily: '"Georgia", serif',
            }}>
              Welcome Back
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', mt: 0.5 }}>
              Sign in to your AgriConnect account
            </Typography>
          </Box>

          <Box sx={{ p: { xs: 3, sm: 4 } }}>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>

              <TextField
                fullWidth required label="Email Address" name="email"
                type="email" autoComplete="email" autoFocus
                value={formData.email} onChange={handleChange}
                size="small" sx={{ mb: 2 }}
              />

              <TextField
                fullWidth required label="Password" name="password"
                type="password" autoComplete="current-password"
                value={formData.password} onChange={handleChange}
                size="small" sx={{ mb: 3 }}
              />

              <Button
                type="submit" fullWidth variant="contained" size="large"
                disabled={loading}
                sx={{
                  py: 1.5, fontWeight: 700, fontSize: '1rem', borderRadius: 2,
                  background: 'linear-gradient(135deg, #2e7d32, #388e3c)',
                  '&:hover': { background: 'linear-gradient(135deg, #1b5e20, #2e7d32)' },
                }}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

            </Box>

            <Divider sx={{ my: 3 }} />

            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link to="/register" style={{ textDecoration: 'none', color: '#2e7d32', fontWeight: 700 }}>
                  Create Account
                </Link>
              </Typography>
            </Box>

          </Box>
        </Paper>

        <Typography variant="caption" color="text.secondary" align="center" display="block" sx={{ mt: 3 }}>
          By signing in you agree to our Terms of Service and Privacy Policy.
        </Typography>

      </Container>
    </Box>
  );
};

export default Login;