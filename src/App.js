import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { LandProvider } from './contexts/LandContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './components/Home/Home';
import BrowseLands from './components/Lands/BrowseLands';
import PostLand from './components/Lands/PostLand';
import LandDetails from './components/Lands/LandDetails';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Chat from './components/Chat/Chat';
import Profile from './components/Auth/Profile';
import AboutUs from './components/About/AboutUs';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import './App.css';

const theme = createTheme({
  palette: {
    primary: { main: '#2e7d32' },
    secondary: { main: '#66bb6a' },
    background: { default: '#f5f5f5' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LandProvider>
        <Router>
          <Header />
          <Box sx={{ flex: 1 }}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Any logged-in user */}
            <Route path="/lands" element={
              <ProtectedRoute>
                <BrowseLands />
              </ProtectedRoute>
            } />
            <Route path="/lands/:id" element={
              <ProtectedRoute>
                <LandDetails />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/chat" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/chat/:userId" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />

            {/* Landowner only */}
            <Route path="/post-land" element={
              <ProtectedRoute requiredRole="landowner">
                <PostLand />
              </ProtectedRoute>
            } />
          </Routes>
          </Box>
          <Footer />
        </Router>
      </LandProvider>
    </ThemeProvider>
  );
}

export default App;