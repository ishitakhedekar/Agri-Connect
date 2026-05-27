// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Grid,
//   Avatar,
//   Paper,
//   Divider,
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { API_BASE_URL } from '../../api';

// const Profile = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     bio: '',
//   });

//   useEffect(() => {
//     const loadUser = async () => {
//       const storedUser = localStorage.getItem('user');
//       if (storedUser) {
//         const userData = JSON.parse(storedUser);
//         setUser(userData);
//         setFormData({
//           name: userData.name || '',
//           email: userData.email || '',
//           // phone: userData.phonenumber || userData.phone || '',
//           phone:userData.phone || '',
//           address: userData.address || '',
//           bio: userData.bio || '',
//         });

//         // Fetch full user from backend
//         if (userData.token) {
//           try {
//             const { data: fullUserData } = await axios.get(`${API_BASE_URL}/users/profile`, {
//               headers: { Authorization: `Bearer ${userData.token}` }
//             });
//             const fullUser = { ...userData, ...fullUserData };
//             setUser(fullUser);
//             setFormData({
//               name: fullUser.name || '',
//               email: fullUser.email || '',
//               phone: fullUser.phonenumber || fullUser.phone || '',
//               address: fullUser.address || '',
//               bio: fullUser.bio || '',
//             });
//             localStorage.setItem('user', JSON.stringify(fullUser));
//           } catch (err) {
//             console.error('Failed to fetch profile:', err);
//             // Fall back to localStorage data
//           }
//         }
//       } else {
//         navigate('/login');
//       }
//     };

//     loadUser();
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = () => {
//     const updatedUser = { ...user, ...formData };
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//     setUser(updatedUser);
//     setEditMode(false);
//   };

//   const handleCancel = () => {
//     setFormData({
//       name: user?.name || '',
//       email: user?.email || '',
//       phone: user?.phonenumber || user?.phone || '',
//       address: user?.address || '',
//       bio: user?.bio || '',
//     });
//     setEditMode(false);
//   };

//   if (!user) {
//     return (
//       <Container sx={{ mt: 4 }}>
//         <Typography variant="h5" align="center">
//           Loading...
//         </Typography>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md" sx={{ mt: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         User Profile
//       </Typography>
      
//       <Paper elevation={3} sx={{ p: 4 }}>
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={4}>
//             <Box sx={{ textAlign: 'center' }}>
//               <Avatar
//                 sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
//                 src={user.avatar || '/api/placeholder/120/120'}
//               />
//               <Typography variant="h6">{user.name}</Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {user.role}
//               </Typography>
//             </Box>
//           </Grid>
          
//           <Grid item xs={12} md={8}>
//             <Card>
//               <CardContent>
//                 {editMode ? (
//                   <Grid container spacing={3}>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Email"
//                         name="email"
//                         type="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <TextField
//                         fullWidth
//                         label="Phone"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         label="Address"
//                         name="address"
//                         value={formData.address}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <TextField
//                         fullWidth
//                         multiline
//                         rows={4}
//                         label="Bio"
//                         name="bio"
//                         value={formData.bio}
//                         onChange={handleInputChange}
//                       />
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Box sx={{ display: 'flex', gap: 2 }}>
//                         <Button variant="contained" onClick={handleSave}>
//                           Save Changes
//                         </Button>
//                         <Button variant="outlined" onClick={handleCancel}>
//                           Cancel
//                         </Button>
//                       </Box>
//                     </Grid>
//                   </Grid>
//                 ) : (
//                   <Box>
//                     <Typography variant="h6" gutterBottom>
//                       Profile Information
//                     </Typography>
//                     <Grid container spacing={2}>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Name
//                         </Typography>
//                         <Typography variant="body1">{user.name}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Email
//                         </Typography>
//                         <Typography variant="body1">{user.email}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Phone
//                         </Typography>
//                         <Typography variant="body1">{user.phonenumber || user.phone || 'Not provided'}</Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={6}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Role
//                         </Typography>
//                         <Typography variant="body1">{user.role}</Typography>
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Address
//                         </Typography>
//                         <Typography variant="body1">{user.address || 'Not provided'}</Typography>
//                       </Grid>
//                       <Grid item xs={12}>
//                         <Typography variant="subtitle2" color="text.secondary">
//                           Bio
//                         </Typography>
//                         <Typography variant="body1">{user.bio || 'No bio provided'}</Typography>
//                       </Grid>
//                     </Grid>
//                     <Box sx={{ mt: 3 }}>
//                       <Button variant="contained" onClick={() => setEditMode(true)}>
//                         Edit Profile
//                       </Button>
//                     </Box>
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Container>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Avatar,
  Paper,
  Divider,
  Alert,
  Chip,
  CircularProgress,
  Snackbar,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    bio: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const loadUser = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        navigate('/login');
        return;
      }

      const userData = JSON.parse(storedUser);

      // Immediately populate from localStorage while we fetch fresh data
      setUser(userData);
      setFormData({
        name: userData.name || '',
        phone: userData.phonenumber || userData.phone || '',
        address: userData.address || '',
        bio: userData.bio || '',
      });

      // Fetch fresh profile from API
      if (userData.token) {
        try {
          const { data: freshData } = await axios.get(`${API_BASE_URL}/users/profile`, {
            headers: { Authorization: `Bearer ${userData.token}` }
          });
          const merged = { ...userData, ...freshData };
          setUser(merged);
          setFormData({
            name: merged.name || '',
            phone: merged.phonenumber || '',
            address: merged.address || '',
            bio: merged.bio || '',
          });
          localStorage.setItem('user', JSON.stringify(merged));
        } catch (err) {
          console.error('Failed to fetch profile from API, using localStorage data.');
        }
      }

      setLoading(false);
    };

    loadUser();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    setError('');
    setSaving(true);
    try {
      const { data } = await axios.put(
        `${API_BASE_URL}/users/profile`,
        {
          name: formData.name,
          phonenumber: formData.phone,
          address: formData.address,
          bio: formData.bio,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      const updatedUser = { ...user, ...data.user, token: user.token };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      window.dispatchEvent(new Event('userUpdated'));
      setEditMode(false);
      setSnackbar({ open: true, message: 'Profile updated successfully!', severity: 'success' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    setError('');
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }

    setSaving(true);
    try {
      await axios.put(
        `${API_BASE_URL}/users/change-password`,
        {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordMode(false);
      setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      phone: user?.phonenumber || '',
      address: user?.address || '',
      bio: user?.bio || '',
    });
    setError('');
    setEditMode(false);
    setPasswordMode(false);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <Container sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        My Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>

          {/* Left: Avatar + role */}
          <Grid item xs={12} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 100, height: 100, mx: 'auto', mb: 2,
                  bgcolor: 'primary.main', fontSize: '2rem'
                }}
              >
                {getInitials(user?.name)}
              </Avatar>
              <Typography variant="h6" fontWeight="bold">{user?.name}</Typography>
              <Chip
                label={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'}
                color="primary"
                size="small"
                sx={{ mt: 1 }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {user?.email}
              </Typography>
            </Box>
          </Grid>

          {/* Right: Info / Edit form */}
          <Grid item xs={12} md={9}>
            <Card variant="outlined">
              <CardContent>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {/* VIEW MODE */}
                {!editMode && !passwordMode && (
                  <>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6" display="flex" alignItems="center" gap={1}>
                        <PersonIcon fontSize="small" /> Profile Information
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          variant="contained"
                          onClick={() => setEditMode(true)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<LockIcon />}
                          variant="outlined"
                          onClick={() => setPasswordMode(true)}
                        >
                          Password
                        </Button>
                      </Box>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Full Name</Typography>
                        <Typography variant="body1">{user?.name || '—'}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Email</Typography>
                        <Typography variant="body1">{user?.email || '—'}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Phone</Typography>
                        <Typography variant="body1">{user?.phonenumber || '—'}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Role</Typography>
                        <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>{user?.role || '—'}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Address</Typography>
                        <Typography variant="body1">{user?.address || '—'}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">Bio</Typography>
                        <Typography variant="body1" color={user?.bio ? 'text.primary' : 'text.secondary'}>
                          {user?.bio || 'No bio provided yet.'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                )}

                {/* EDIT MODE */}
                {editMode && (
                  <>
                    <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Full Name" name="name" value={formData.name} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField fullWidth label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField fullWidth label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth multiline rows={3}
                          label="Bio" name="bio"
                          placeholder="Tell others a little about yourself..."
                          value={formData.bio}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button variant="contained" onClick={handleSaveProfile} disabled={saving}>
                            {saving ? 'Saving...' : 'Save Changes'}
                          </Button>
                          <Button variant="outlined" onClick={handleCancel} disabled={saving}>
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}

                {/* PASSWORD MODE */}
                {passwordMode && (
                  <>
                    <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth type="password"
                          label="Current Password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth type="password"
                          label="New Password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth type="password"
                          label="Confirm New Password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button variant="contained" onClick={handleChangePassword} disabled={saving}>
                            {saving ? 'Updating...' : 'Update Password'}
                          </Button>
                          <Button variant="outlined" onClick={handleCancel} disabled={saving}>
                            Cancel
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </>
                )}

              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;