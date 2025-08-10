import React from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const LandDetails = () => {
  const { id } = useParams();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Land Details
      </Typography>
      <Typography variant="body1">
        Details for land ID: {id}
      </Typography>
    </Container>
  );
};

export default LandDetails;
