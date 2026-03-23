import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box, Container,
  Alert, Divider,
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: '', phone: '', location: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.role) { setError('Please select your role to continue'); return; }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return; }
    if (formData.password.length < 6) { setError('Password must be at least 6 characters'); return; }

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phonenumber: formData.phone,
      address: formData.location,
    };

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/register`, payload);
      const userData = data.user || data;
      const fullUser = { ...payload, password: undefined, ...userData, token: data.token };
      localStorage.setItem('user', JSON.stringify(fullUser));
      window.dispatchEvent(new Event('userUpdated'));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const SectionLabel = ({ icon, text }) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
      <Box sx={{ color: '#2e7d32' }}>{icon}</Box>
      <Typography variant="caption" fontWeight="700" color="text.secondary"
        sx={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.7rem' }}>
        {text}
      </Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: '#e0e0e0' }} />
    </Box>
  );

  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #f1f8e9 0%, #e8f5e9 50%, #fafafa 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      py: 6,
    }}>
      <Container maxWidth="sm">
        <Box sx={{
          bgcolor: 'white', borderRadius: 4,
          boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
          border: '1px solid #eeeeee',
          overflow: 'hidden',
        }}>

          {/* Top accent bar */}
          <Box sx={{ height: 5, background: 'linear-gradient(90deg, #1b5e20, #66bb6a)' }} />

          <Box sx={{ px: { xs: 3, sm: 5 }, pt: 4, pb: 5 }}>

            {/* Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" fontWeight="800" color="#1b5e20" gutterBottom>
                Create an account
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Already have one?{' '}
                <Link to="/login" style={{ color: '#2e7d32', fontWeight: 700, textDecoration: 'none' }}>
                  Sign in
                </Link>
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2, fontSize: '0.85rem' }}>{error}</Alert>
            )}

            <Box component="form" onSubmit={handleSubmit}>

              {/* ── Role ── */}
              <SectionLabel icon={<CheckCircleIcon sx={{ fontSize: 15 }} />} text="I am joining as" />
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 3.5 }}>
                {[
                  { value: 'farmer', emoji: '🌾', label: 'Farmer', sub: 'Looking for land to cultivate' },
                  { value: 'landowner', emoji: '🏡', label: 'Landowner', sub: 'Looking to lease my land' },
                ].map((r) => (
                  <Box
                    key={r.value}
                    onClick={() => setFormData({ ...formData, role: r.value })}
                    sx={{
                      flex: 1, p: 2.5, borderRadius: 2.5, cursor: 'pointer',
                      border: formData.role === r.value ? '2px solid #2e7d32' : '1.5px solid #e8e8e8',
                      bgcolor: formData.role === r.value ? '#f1f8f1' : '#fafafa',
                      transition: 'all 0.18s ease',
                      position: 'relative',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      textAlign: 'center', minHeight: 110,
                      '&:hover': { borderColor: '#66bb6a', bgcolor: '#f5fbf5' },
                    }}
                  >
                    {formData.role === r.value && (
                      <CheckCircleIcon sx={{
                        position: 'absolute', top: 8, right: 8,
                        fontSize: 16, color: '#2e7d32',
                      }} />
                    )}
                    <Typography sx={{ fontSize: '2rem', lineHeight: 1, mb: 1 }}>{r.emoji}</Typography>
                    <Typography variant="subtitle2" fontWeight="700" sx={{ mb: 0.3 }}>{r.label}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.3, display: 'block' }}>{r.sub}</Typography>
                  </Box>
                ))}
              </Box>

              {/* ── Personal Details ── */}
              <SectionLabel icon={<PersonOutlineIcon sx={{ fontSize: 15 }} />} text="Personal Details" />
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField fullWidth required label="Full Name" name="name"
                  value={formData.name} onChange={handleChange}
                  size="small" autoFocus />
                <TextField fullWidth required label="Phone Number" name="phone"
                  type="tel" value={formData.phone} onChange={handleChange}
                  size="small" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
                <TextField fullWidth required label="Email Address" name="email"
                  type="email" autoComplete="email"
                  value={formData.email} onChange={handleChange}
                  size="small" />
                <TextField fullWidth label="City / State" name="location"
                  value={formData.location} onChange={handleChange}
                  size="small" placeholder="e.g. Pune, Maharashtra" />
              </Box>

              {/* ── Password ── */}
              <Box sx={{ mt: 3, mb: 1 }}>
                <SectionLabel icon={<LockOutlinedIcon sx={{ fontSize: 15 }} />} text="Password" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 3.5 }}>
                <TextField fullWidth required label="Password" name="password"
                  type="password" value={formData.password} onChange={handleChange}
                  size="small" helperText="At least 6 characters" />
                <TextField fullWidth required label="Confirm Password" name="confirmPassword"
                  type="password" value={formData.confirmPassword} onChange={handleChange}
                  size="small" />
              </Box>

              {/* Submit */}
              <Button
                type="submit" fullWidth variant="contained" size="large"
                disabled={loading}
                sx={{
                  py: 1.5, fontWeight: 700, fontSize: '0.95rem',
                  borderRadius: 2.5, letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, #2e7d32, #43a047)',
                  boxShadow: '0 4px 14px rgba(46,125,50,0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1b5e20, #2e7d32)',
                    boxShadow: '0 6px 18px rgba(46,125,50,0.4)',
                  },
                }}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Typography variant="caption" color="text.disabled" align="center" display="block" sx={{ mt: 2.5 }}>
                By signing up you agree to our Terms of Service and Privacy Policy.
              </Typography>

            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Register;