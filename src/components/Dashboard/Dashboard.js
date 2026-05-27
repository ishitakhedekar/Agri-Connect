// import React, { useState, useEffect } from 'react';
// import {
//   Container, Typography, Box, Grid, Card, CardContent,
//   Button, Avatar, Chip, Divider, Paper, LinearProgress,
// } from '@mui/material';
// import { Link } from 'react-router-dom';
// import AgricultureIcon from '@mui/icons-material/Agriculture';
// import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
// import SearchIcon from '@mui/icons-material/Search';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import PersonIcon from '@mui/icons-material/Person';
// import LandscapeIcon from '@mui/icons-material/Landscape';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { useLands } from '../../contexts/LandContext';

// // ─── Stat Card ───────────────────────────────────────────────────────────────
// const StatCard = ({ icon, label, value, color, sub }) => (
//   <Paper elevation={0} sx={{
//     p: 3, height: '100%', borderRadius: 3,
//     border: '1px solid #e0e0e0',
//     position: 'relative', overflow: 'hidden',
//     transition: 'transform 0.2s, box-shadow 0.2s',
//     '&:hover': { transform: 'translateY(-3px)', boxShadow: 3 },
//   }}>
//     {/* Background accent circle */}
//     <Box sx={{
//       position: 'absolute', top: -20, right: -20,
//       width: 90, height: 90, borderRadius: '50%',
//       bgcolor: `${color}12`,
//     }} />
//     <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
//       <Box sx={{
//         width: 44, height: 44, borderRadius: 2,
//         bgcolor: `${color}18`,
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         color,
//       }}>
//         {icon}
//       </Box>
//     </Box>
//     <Typography variant="h4" fontWeight="800" sx={{ color, lineHeight: 1, mb: 0.5 }}>
//       {value}
//     </Typography>
//     <Typography variant="body2" fontWeight="600" color="text.primary" sx={{ mb: 0.3 }}>
//       {label}
//     </Typography>
//     {sub && (
//       <Typography variant="caption" color="text.secondary">{sub}</Typography>
//     )}
//   </Paper>
// );

// // ─── Action Card ─────────────────────────────────────────────────────────────
// const ActionCard = ({ icon, title, description, buttonLabel, to, color }) => (
//   <Paper elevation={0} sx={{
//     p: 3, height: '100%', borderRadius: 3,
//     border: '1px solid #e0e0e0',
//     display: 'flex', flexDirection: 'column',
//     transition: 'transform 0.2s, box-shadow 0.2s',
//     '&:hover': { transform: 'translateY(-3px)', boxShadow: 3, borderColor: color },
//     borderTop: `3px solid ${color}`,
//   }}>
//     <Box sx={{
//       width: 46, height: 46, borderRadius: 2,
//       bgcolor: `${color}15`,
//       display: 'flex', alignItems: 'center', justifyContent: 'center',
//       color, mb: 2,
//     }}>
//       {icon}
//     </Box>
//     <Typography variant="subtitle1" fontWeight="700" gutterBottom>{title}</Typography>
//     <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, flexGrow: 1, mb: 2.5 }}>
//       {description}
//     </Typography>
//     <Box component={Link} to={to} sx={{
//       display: 'inline-flex', alignItems: 'center', gap: 0.5,
//       color, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem',
//       '&:hover': { gap: 1 }, transition: 'gap 0.15s',
//     }}>
//       {buttonLabel} <ArrowForwardIcon sx={{ fontSize: 15 }} />
//     </Box>
//   </Paper>
// );

// // ─── Land Row ─────────────────────────────────────────────────────────────────
// const LandRow = ({ land, index }) => (
//   <Box>
//     {index > 0 && <Divider sx={{ my: 2 }} />}
//     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
//       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
//         <Box sx={{
//           width: 42, height: 42, borderRadius: 2, flexShrink: 0,
//           bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
//         }}>
//           <LandscapeIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
//         </Box>
//         <Box sx={{ minWidth: 0 }}>
//           <Typography variant="subtitle2" fontWeight="700" noWrap>{land.title}</Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//             <LocationOnIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
//             <Typography variant="caption" color="text.secondary" noWrap>
//               {land.location} · {land.area} sq ft · {land.landType}
//             </Typography>
//           </Box>
//         </Box>
//       </Box>
//       <Button size="small" variant="outlined" component={Link} to={`/lands/${land._id}`}
//         sx={{ flexShrink: 0, borderRadius: 2, fontSize: '0.75rem' }}>
//         View
//       </Button>
//     </Box>
//   </Box>
// );

// // ─── Main Dashboard ───────────────────────────────────────────────────────────
// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const { lands } = useLands();

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//     const handleUpdate = () => {
//       const u = localStorage.getItem('user');
//       if (u) setUser(JSON.parse(u));
//     };
//     window.addEventListener('userUpdated', handleUpdate);
//     return () => window.removeEventListener('userUpdated', handleUpdate);
//   }, []);

//   if (!user) {
//     return (
//       <Container sx={{ mt: 4, textAlign: 'center' }}>
//         <Typography variant="h5" gutterBottom>Please login to view your dashboard.</Typography>
//         <Button variant="contained" component={Link} to="/login" sx={{ mt: 2 }}>Login</Button>
//       </Container>
//     );
//   }

//   const myLands = lands.filter(l =>
//     l.owner === user.id || l.owner?._id === user.id || l.owner?.id === user.id
//   );

//   const getGreeting = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good morning';
//     if (h < 18) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const isLandowner = user.role === 'landowner';
//   const accentColor = isLandowner ? '#2e7d32' : '#1565c0';
//   const roleLabel = isLandowner ? 'Landowner' : 'Farmer';

//   const stats = isLandowner ? [
//     { icon: <LandscapeIcon />, label: 'Land Posts', value: myLands.length, color: '#2e7d32', sub: 'Total listings created' },
//     { icon: <TrendingUpIcon />, label: 'Active Listings', value: myLands.length, color: '#1565c0', sub: 'Currently visible' },
//     { icon: <ChatBubbleOutlineIcon />, label: 'Farmer Inquiries', value: '—', color: '#e65100', sub: 'Via chat' },
//   ] : [
//     { icon: <LandscapeIcon />, label: 'Lands Available', value: lands.length, color: '#2e7d32', sub: 'Ready to cultivate' },
//     { icon: <SearchIcon />, label: 'New This Week', value: '—', color: '#1565c0', sub: 'Recent listings' },
//     { icon: <ChatBubbleOutlineIcon />, label: 'Active Chats', value: '—', color: '#e65100', sub: 'With landowners' },
//   ];

//   const actions = isLandowner ? [
//     { icon: <AddLocationAltIcon />, title: 'Post New Land', description: 'List your agricultural land for lease and connect with farmers who are ready to cultivate it.', buttonLabel: 'Post Land', to: '/post-land', color: '#2e7d32' },
//     { icon: <LandscapeIcon />, title: 'Browse Lands', description: 'See all land listings on the platform — including your own — and explore what others have posted.', buttonLabel: 'Browse Lands', to: '/lands', color: '#1565c0' },
//     { icon: <PersonIcon />, title: 'My Profile', description: 'Keep your contact information, address, and bio up to date so farmers can reach you easily.', buttonLabel: 'View Profile', to: '/profile', color: '#6a1b9a' },
//   ] : [
//     { icon: <SearchIcon />, title: 'Browse Lands', description: 'Explore available land listings and find the perfect plot to start cultivating this season.', buttonLabel: 'Browse Lands', to: '/lands', color: '#2e7d32' },
//     { icon: <ChatBubbleOutlineIcon />, title: 'My Chats', description: 'View your conversations with landowners and pick up where you left off on any negotiation.', buttonLabel: 'View Chats', to: '/chat', color: '#1565c0' },
//     { icon: <PersonIcon />, title: 'My Profile', description: 'Keep your contact details and bio up to date so landowners know who they are dealing with.', buttonLabel: 'View Profile', to: '/profile', color: '#6a1b9a' },
//   ];

//   const previewLands = isLandowner ? myLands.slice(0, 3) : lands.slice(0, 3);
//   const previewTitle = isLandowner ? 'My Land Listings' : 'Recently Listed Lands';
//   const emptyMessage = isLandowner ? "You haven't posted any lands yet." : 'No lands listed yet. Check back soon!';
//   const emptyAction = isLandowner ? { label: 'Post Your First Land', to: '/post-land' } : null;

//   return (
//     <Box>
//       {/* ── Hero Banner ───────────────────────────────────────────────── */}
//       <Box sx={{
//         background: `linear-gradient(135deg, ${isLandowner ? '#1b5e20 0%, #2e7d32' : '#0d47a1 0%, #1565c0'} 100%)`,
//         color: 'white', py: 5, px: 0,
//         position: 'relative', overflow: 'hidden',
//       }}>
//         <Box sx={{
//           position: 'absolute', inset: 0,
//           backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
//           backgroundSize: '28px 28px',
//         }} />
//         <Container maxWidth="lg" sx={{ position: 'relative' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
//             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
//               <Avatar sx={{
//                 width: 64, height: 64, bgcolor: 'rgba(255,255,255,0.15)',
//                 fontSize: '1.6rem', fontWeight: 700, border: '2px solid rgba(255,255,255,0.3)',
//               }}>
//                 {user.name?.charAt(0).toUpperCase()}
//               </Avatar>
//               <Box>
//                 <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 0.3 }}>
//                   {getGreeting()}
//                 </Typography>
//                 <Typography variant="h5" fontWeight="800" sx={{ lineHeight: 1.2, mb: 0.5 }}>
//                   {user.name?.split(' ')[0]} 👋
//                 </Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                   <Chip label={roleLabel} size="small"
//                     sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.7rem' }} />
//                   <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>{user.email}</Typography>
//                 </Box>
//               </Box>
//             </Box>
//             {isLandowner && (
//               <Button
//                 component={Link} to="/post-land"
//                 variant="contained"
//                 startIcon={<AddLocationAltIcon />}
//                 sx={{
//                   bgcolor: 'white', color: accentColor, fontWeight: 700,
//                   borderRadius: 2, px: 3,
//                   '&:hover': { bgcolor: '#f1f8e9' },
//                 }}
//               >
//                 Post New Land
//               </Button>
//             )}
//           </Box>
//         </Container>
//       </Box>

//       <Container maxWidth="lg" sx={{ py: 4, mb: 4 }}>

//         {/* ── Stats ─────────────────────────────────────────────────────── */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {stats.map((s, i) => (
//             <Grid item xs={12} sm={4} key={i}>
//               <StatCard {...s} />
//             </Grid>
//           ))}
//         </Grid>

//         <Grid container spacing={4}>

//           {/* ── Actions + Preview ───────────────────────────── */}
//           <Grid item xs={12}>

//             {/* Quick Actions */}
//             <Typography variant="subtitle1" fontWeight="700" color="text.secondary"
//               sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2, fontSize: '0.75rem' }}>
//               Quick Actions
//             </Typography>
//             <Grid container spacing={2.5} sx={{ mb: 4 }}>
//               {actions.map((a, i) => (
//                 <Grid item xs={12} sm={4} key={i}>
//                   <ActionCard {...a} />
//                 </Grid>
//               ))}
//             </Grid>

//             {/* Land Preview */}
//             <Typography variant="subtitle1" fontWeight="700" color="text.secondary"
//               sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2, fontSize: '0.75rem' }}>
//               {previewTitle}
//             </Typography>
//             <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
//               {previewLands.length === 0 ? (
//                 <Box sx={{ textAlign: 'center', py: 6 }}>
//                   <AgricultureIcon sx={{ fontSize: 44, color: '#ccc', mb: 1.5 }} />
//                   <Typography color="text.secondary" sx={{ mb: 2 }}>{emptyMessage}</Typography>
//                   {emptyAction && (
//                     <Button variant="contained" component={Link} to={emptyAction.to}
//                       sx={{ borderRadius: 2 }}>
//                       {emptyAction.label}
//                     </Button>
//                   )}
//                 </Box>
//               ) : (
//                 <Box sx={{ p: 3 }}>
//                   {previewLands.map((land, i) => (
//                     <LandRow key={land._id || i} land={land} index={i} />
//                   ))}
//                   <Divider sx={{ mt: 2, mb: 2 }} />
//                   <Box sx={{ textAlign: 'center' }}>
//                     <Button
//                       component={Link}
//                       to={isLandowner ? '/lands' : '/lands'}
//                       endIcon={<ArrowForwardIcon />}
//                       sx={{ color: accentColor, fontWeight: 700, fontSize: '0.85rem' }}
//                     >
//                       {isLandowner ? `View all ${myLands.length} listings` : `Browse all ${lands.length} listings`}
//                     </Button>
//                   </Box>
//                 </Box>
//               )}
//             </Paper>
//           </Grid>

//           </Grid>

        
//       </Container>
//     </Box>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Grid, Card, CardContent,
  Button, Avatar, Chip, Divider, Paper, LinearProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import PersonIcon from '@mui/icons-material/Person';
import LandscapeIcon from '@mui/icons-material/Landscape';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useLands } from '../../contexts/LandContext';

// ─── Stat Card ───────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color, sub }) => (
  <Paper elevation={0} sx={{
    p: 3, height: '100%', borderRadius: 3,
    border: '1px solid #e0e0e0',
    position: 'relative', overflow: 'hidden',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': { transform: 'translateY(-3px)', boxShadow: 3 },
  }}>
    {/* Background accent circle */}
    <Box sx={{
      position: 'absolute', top: -20, right: -20,
      width: 90, height: 90, borderRadius: '50%',
      bgcolor: `${color}12`,
    }} />
    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{
        width: 44, height: 44, borderRadius: 2,
        bgcolor: `${color}18`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
      }}>
        {icon}
      </Box>
    </Box>
    <Typography variant="h4" fontWeight="800" sx={{ color, lineHeight: 1, mb: 0.5 }}>
      {value}
    </Typography>
    <Typography variant="body2" fontWeight="600" color="text.primary" sx={{ mb: 0.3 }}>
      {label}
    </Typography>
    {sub && (
      <Typography variant="caption" color="text.secondary">{sub}</Typography>
    )}
  </Paper>
);

// ─── Action Card ─────────────────────────────────────────────────────────────
const ActionCard = ({ icon, title, description, buttonLabel, to, color }) => (
  <Paper elevation={0} sx={{
    p: 3, height: '100%', borderRadius: 3,
    border: '1px solid #e0e0e0',
    display: 'flex', flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
    '&:hover': { transform: 'translateY(-3px)', boxShadow: 3, borderColor: color },
    borderTop: `3px solid ${color}`,
  }}>
    <Box sx={{
      width: 46, height: 46, borderRadius: 2,
      bgcolor: `${color}15`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color, mb: 2,
    }}>
      {icon}
    </Box>
    <Typography variant="subtitle1" fontWeight="700" gutterBottom>{title}</Typography>
    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, flexGrow: 1, mb: 2.5 }}>
      {description}
    </Typography>
    <Box component={Link} to={to} sx={{
      display: 'inline-flex', alignItems: 'center', gap: 0.5,
      color, textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem',
      '&:hover': { gap: 1 }, transition: 'gap 0.15s',
    }}>
      {buttonLabel} <ArrowForwardIcon sx={{ fontSize: 15 }} />
    </Box>
  </Paper>
);

// ─── Land Row ─────────────────────────────────────────────────────────────────
const LandRow = ({ land, index }) => (
  <Box>
    {index > 0 && <Divider sx={{ my: 2 }} />}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0 }}>
        <Box sx={{
          width: 42, height: 42, borderRadius: 2, flexShrink: 0,
          bgcolor: '#e8f5e9', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <LandscapeIcon sx={{ color: '#2e7d32', fontSize: 20 }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="subtitle2" fontWeight="700" noWrap>{land.title}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOnIcon sx={{ fontSize: 12, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary" noWrap>
              {land.location} · {land.area} sq ft · {land.landType}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Button size="small" variant="outlined" component={Link} to={`/lands/${land._id}`}
        sx={{ flexShrink: 0, borderRadius: 2, fontSize: '0.75rem' }}>
        View
      </Button>
    </Box>
  </Box>
);

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Dashboard = () => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const { lands } = useLands();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const handleUpdate = () => {
      const u = localStorage.getItem('user');
      if (u) setUser(JSON.parse(u));
    };
    window.addEventListener('userUpdated', handleUpdate);
    return () => window.removeEventListener('userUpdated', handleUpdate);
  }, []);

  if (!user) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>Please login to view your dashboard.</Typography>
        <Button variant="contained" component={Link} to="/login" sx={{ mt: 2 }}>Login</Button>
      </Container>
    );
  }

  const myLands = lands.filter(l =>
    l.owner === user.id || l.owner?._id === user.id || l.owner?.id === user.id
  );

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const isLandowner = user.role === 'landowner';
  const accentColor = isLandowner ? '#2e7d32' : '#1565c0';
  const roleLabel = isLandowner ? 'Landowner' : 'Farmer';

  const stats = isLandowner ? [
    { icon: <LandscapeIcon />, label: 'Land Posts', value: myLands.length, color: '#2e7d32', sub: 'Total listings created' },
    { icon: <TrendingUpIcon />, label: 'Active Listings', value: myLands.length, color: '#1565c0', sub: 'Currently visible' },
    { icon: <ChatBubbleOutlineIcon />, label: 'Farmer Inquiries', value: '—', color: '#e65100', sub: 'Via chat' },
  ] : [
    { icon: <LandscapeIcon />, label: 'Lands Available', value: lands.length, color: '#2e7d32', sub: 'Ready to cultivate' },
    { icon: <SearchIcon />, label: 'New This Week', value: '—', color: '#1565c0', sub: 'Recent listings' },
    { icon: <ChatBubbleOutlineIcon />, label: 'Active Chats', value: '—', color: '#e65100', sub: 'With landowners' },
  ];

  const actions = isLandowner ? [
    { icon: <AddLocationAltIcon />, title: 'Post New Land', description: 'List your agricultural land for lease and connect with farmers who are ready to cultivate it.', buttonLabel: 'Post Land', to: '/post-land', color: '#2e7d32' },
    { icon: <LandscapeIcon />, title: 'Browse Lands', description: 'See all land listings on the platform — including your own — and explore what others have posted.', buttonLabel: 'Browse Lands', to: '/lands', color: '#1565c0' },
    { icon: <PersonIcon />, title: 'My Profile', description: 'Keep your contact information, address, and bio up to date so farmers can reach you easily.', buttonLabel: 'View Profile', to: '/profile', color: '#6a1b9a' },
  ] : [
    { icon: <SearchIcon />, title: 'Browse Lands', description: 'Explore available land listings and find the perfect plot to start cultivating this season.', buttonLabel: 'Browse Lands', to: '/lands', color: '#2e7d32' },
    { icon: <ChatBubbleOutlineIcon />, title: 'My Chats', description: 'View your conversations with landowners and pick up where you left off on any negotiation.', buttonLabel: 'View Chats', to: '/chat', color: '#1565c0' },
    { icon: <PersonIcon />, title: 'My Profile', description: 'Keep your contact details and bio up to date so landowners know who they are dealing with.', buttonLabel: 'View Profile', to: '/profile', color: '#6a1b9a' },
  ];

  const previewLands = isLandowner ? myLands.slice(0, 3) : lands.slice(0, 3);
  const previewTitle = isLandowner ? 'My Land Listings' : 'Recently Listed Lands';
  const emptyMessage = isLandowner ? "You haven't posted any lands yet." : 'No lands listed yet. Check back soon!';
  const emptyAction = isLandowner ? { label: 'Post Your First Land', to: '/post-land' } : null;

  return (
    <Box>
      {/* ── Hero Banner ───────────────────────────────────────────────── */}
      <Box sx={{
        background: `linear-gradient(135deg, ${isLandowner ? '#1b5e20 0%, #2e7d32' : '#0d47a1 0%, #1565c0'} 100%)`,
        color: 'white', py: 5, px: 0,
        position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
              <Avatar sx={{
                width: 64, height: 64, bgcolor: 'rgba(255,255,255,0.15)',
                fontSize: '1.6rem', fontWeight: 700, border: '2px solid rgba(255,255,255,0.3)',
              }}>
                {user.name?.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', letterSpacing: '0.1em', textTransform: 'uppercase', mb: 0.3 }}>
                  {getGreeting()}
                </Typography>
                <Typography variant="h5" fontWeight="800" sx={{ lineHeight: 1.2, mb: 0.5 }}>
                  {user.name?.split(' ')[0]} 👋
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip label={roleLabel} size="small"
                    sx={{ bgcolor: 'rgba(255,255,255,0.15)', color: 'white', fontWeight: 600, fontSize: '0.7rem' }} />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.65)' }}>{user.email}</Typography>
                </Box>
              </Box>
            </Box>

          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4, mb: 4 }}>

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((s, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <StatCard {...s} />
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>

          {/* ── Actions + Preview ───────────────────────────── */}
          <Grid item xs={12}>

            {/* Quick Actions */}
            <Typography variant="subtitle1" fontWeight="700" color="text.secondary"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2, fontSize: '0.75rem' }}>
              Quick Actions
            </Typography>
            <Grid container spacing={2.5} sx={{ mb: 4 }}>
              {actions.map((a, i) => (
                <Grid item xs={12} sm={4} key={i}>
                  <ActionCard {...a} />
                </Grid>
              ))}
            </Grid>

            {/* Land Preview */}
            <Typography variant="subtitle1" fontWeight="700" color="text.secondary"
              sx={{ textTransform: 'uppercase', letterSpacing: '0.08em', mb: 2, fontSize: '0.75rem' }}>
              {previewTitle}
            </Typography>
            <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
              {previewLands.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <AgricultureIcon sx={{ fontSize: 44, color: '#ccc', mb: 1.5 }} />
                  <Typography color="text.secondary" sx={{ mb: 2 }}>{emptyMessage}</Typography>
                  {emptyAction && (
                    <Button variant="contained" component={Link} to={emptyAction.to}
                      sx={{ borderRadius: 2 }}>
                      {emptyAction.label}
                    </Button>
                  )}
                </Box>
              ) : (
                <Box sx={{ p: 3 }}>
                  {previewLands.map((land, i) => (
                    <LandRow key={land._id || i} land={land} index={i} />
                  ))}
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      component={Link}
                      to={isLandowner ? '/lands' : '/lands'}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: accentColor, fontWeight: 700, fontSize: '0.85rem' }}
                    >
                      {isLandowner ? `View all ${myLands.length} listings` : `Browse all ${lands.length} listings`}
                    </Button>
                  </Box>
                </Box>
              )}
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;