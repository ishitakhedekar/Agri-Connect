import React from 'react';
import { Container, Typography } from '@mui/material';

const PostLand = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Post New Land
      </Typography>
      <Typography variant="body1">
        Post land form will be implemented here.
      </Typography>
    </Container>
  );
};

export default PostLand;
