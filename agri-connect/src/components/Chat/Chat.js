import React from 'react';
import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const { userId } = useParams();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Chat
      </Typography>
      <Typography variant="body1">
        Chat interface for user ID: {userId}
      </Typography>
    </Container>
  );
};

export default Chat;
