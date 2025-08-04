import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  Grid,
  Chip,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Load current user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Mock chat user data - in real app, fetch from API
    setChatUser({
      id: userId,
      name: 'Land Owner',
      avatar: '/api/placeholder/40/40',
      online: true,
    });

    // Mock messages - in real app, fetch from API
    setMessages([
      {
        id: 1,
        text: 'Hello! I saw your land listing and I\'m interested.',
        sender: 'them',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: 2,
        text: 'Great! What would you like to know about the land?',
        sender: 'me',
        timestamp: new Date(Date.now() - 1800000),
      },
    ]);
  }, [userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'me',
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!currentUser) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5" align="center">
          Please login to access chat.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, height: '80vh' }}>
      <Paper elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Chat Header */}
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar src={chatUser?.avatar} />
            </Grid>
            <Grid item>
              <Typography variant="h6">{chatUser?.name}</Typography>
              <Chip
                label={chatUser?.online ? 'Online' : 'Offline'}
                color={chatUser?.online ? 'success' : 'default'}
                size="small"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Messages Area */}
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((message) => (
              <ListItem
                key={message.id}
                sx={{
                  justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                  px: 0,
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%',
                    bgcolor: message.sender === 'me' ? 'primary.main' : 'grey.300',
                    color: message.sender === 'me' ? 'white' : 'black',
                    p: 1.5,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body2">{message.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      opacity: 0.7,
                      fontSize: '0.75rem',
                    }}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </Typography>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>

        {/* Message Input */}
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                size="small"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
