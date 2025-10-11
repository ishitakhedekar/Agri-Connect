import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';

const LandContext = createContext();

export const useLands = () => {
  const context = useContext(LandContext);
  if (!context) {
    throw new Error('useLands must be used within a LandProvider');
  }
  return context;
};

export const LandProvider = ({ children }) => {
  const [lands, setLands] = useState(() => {
    // Load lands from localStorage on initial load
    const savedLands = localStorage.getItem('lands');
    return savedLands ? JSON.parse(savedLands) : [];
  });

  // Save lands to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('lands', JSON.stringify(lands));
  }, [lands]);

  const fetchLands = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;

      const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
      const { data } = await axios.get(`${API_BASE_URL}/lands`, config);
      setLands(data);
    } catch (err) {
      console.error('Failed to fetch lands:', err);
      // Fallback to localStorage
      const savedLands = localStorage.getItem('lands');
      if (savedLands) {
        setLands(JSON.parse(savedLands));
      }
    }
  };

  useEffect(() => {
    fetchLands();
  }, []);

  const refreshLands = () => {
    return fetchLands();
  };

  const addLand = (newLand) => {
    const landWithId = {
      ...newLand,
      id: Date.now(), // Simple ID generation
      status: 'available',
      image: newLand.imageUrl || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400',
      area: parseFloat(newLand.area),
      soilType: newLand.landType, // Map landType to soilType for consistency
    };
    
    setLands(prevLands => [landWithId, ...prevLands]);
  };

  const updateLand = (id, updatedLand) => {
    setLands(prevLands => 
      prevLands.map(land => land.id === id ? { ...land, ...updatedLand } : land)
    );
  };

  const deleteLand = (id) => {
    setLands(prevLands => prevLands.filter(land => land.id !== id));
  };

  const value = {
    lands,
    addLand,
    updateLand,
    deleteLand,
    refreshLands,
  };

  return <LandContext.Provider value={value}>{children}</LandContext.Provider>;
};
