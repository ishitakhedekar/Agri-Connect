import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Container, Grid, Box, Typography, TextField, Button, Paper,
  List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider,
  CircularProgress, Alert, Chip, Badge,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from 'axios';
import { API_BASE_URL } from '../../api';

const POLL_INTERVAL = 4000; // fetch new messages every 4 seconds

const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const Chat = () => {
  const { userId: chatWithId } = useParams(); // the other user's ID from URL
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const token = currentUser?.token;

  const [inbox, setInbox] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [chatPartner, setChatPartner] = useState(null);
  const [loadingInbox, setLoadingInbox] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const messagesEndRef = useRef(null);
  const pollRef = useRef(null);

  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // ── Fetch Inbox ────────────────────────────────────────────────────────────
  const fetchInbox = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/messages/inbox`, authHeader);
      setInbox(data);
    } catch (err) {
      console.error('Failed to fetch inbox:', err);
    } finally {
      setLoadingInbox(false);
    }
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchInbox();
  }, [fetchInbox]);

  // ── Fetch Conversation ─────────────────────────────────────────────────────
  const fetchMessages = useCallback(async () => {
    if (!chatWithId) return;
    try {
      const { data } = await axios.get(`${API_BASE_URL}/messages/${chatWithId}`, authHeader);
      setMessages(data);

      // Set chat partner info from messages if not already set
      if (data.length > 0 && !chatPartner) {
        const partner = data[0].sender._id === currentUser.id
          ? data[0].receiver
          : data[0].sender;
        setChatPartner(partner);
      }
    } catch (err) {
      setError('Failed to load messages.');
    } finally {
      setLoadingMessages(false);
    }
  }, [chatWithId]);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!chatWithId) return;

    setLoadingMessages(true);
    setMessages([]);
    setError('');

    // Try to find partner info from inbox first
    const inboxEntry = inbox.find(c => c.user._id === chatWithId);
    if (inboxEntry) setChatPartner(inboxEntry.user);

    fetchMessages();

    // Start polling
    pollRef.current = setInterval(fetchMessages, POLL_INTERVAL);

    return () => clearInterval(pollRef.current);
  }, [chatWithId, fetchMessages]);// eslint-disable-line react-hooks/exhaustive-deps

  // ── Send Message ───────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!newMessage.trim() || !chatWithId) return;

    setSending(true);
    const content = newMessage.trim();
    setNewMessage('');

    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/messages`,
        { receiverId: chatWithId, content },
        authHeader
      );

      setMessages(prev => [...prev, data.data]);
      fetchInbox(); // refresh inbox with latest message
    } catch (err) {
      setError('Failed to send message.');
      setNewMessage(content); // restore message if failed
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ── Format timestamp ───────────────────────────────────────────────────────
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    return isToday
      ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : date.toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (!token) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h5">Please login to access chat.</Typography>
        <Button variant="contained" onClick={() => navigate('/login')} sx={{ mt: 2 }}>Login</Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3, mb: 4 }}>
      <Paper elevation={3} sx={{ height: '80vh', display: 'flex', overflow: 'hidden', borderRadius: 2 }}>

        {/* ── LEFT: Inbox Sidebar ─────────────────────────────────────────── */}
        <Box sx={{
          width: 280, borderRight: 1, borderColor: 'divider',
          display: 'flex', flexDirection: 'column', flexShrink: 0
        }}>
          <Box sx={{ p: 2, bgcolor: '#2e7d32', color: 'white' }}>
            <Typography variant="h6" fontWeight="bold">💬 Inbox</Typography>
          </Box>

          {loadingInbox ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <CircularProgress size={24} />
            </Box>
          ) : inbox.length === 0 ? (
            <Box sx={{ p: 3, textAlign: 'center' }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
              <Typography variant="body2" color="text.secondary">
                No conversations yet.
              </Typography>
            </Box>
          ) : (
            <List sx={{ overflow: 'auto', flex: 1, p: 0 }}>
              {inbox.map((conv) => (
                <React.Fragment key={conv.user._id}>
                  <ListItem
                    button
                    selected={chatWithId === conv.user._id}
                    onClick={() => navigate(`/chat/${conv.user._id}`)}
                    sx={{
                      '&.Mui-selected': { bgcolor: '#e8f5e9' },
                      '&:hover': { bgcolor: '#f5f5f5' },
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#2e7d32', fontSize: '0.875rem' }}>
                        {getInitials(conv.user.name)}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body2" fontWeight="bold" noWrap>
                          {conv.user.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="caption" color="text.secondary" noWrap>
                          {conv.lastMessage}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* ── RIGHT: Chat Window ──────────────────────────────────────────── */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

          {!chatWithId ? (
            // No conversation selected
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <ChatBubbleOutlineIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">Select a conversation</Typography>
              <Typography variant="body2" color="text.secondary">
                or contact a landowner from a land listing
              </Typography>
            </Box>
          ) : (
            <>
              {/* Chat Header */}
              <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: '#f9f9f9' }}>
                {chatPartner ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Avatar sx={{ bgcolor: '#2e7d32' }}>
                      {getInitials(chatPartner.name)}
                    </Avatar>
                    <Box>
                      <Typography fontWeight="bold">{chatPartner.name}</Typography>
                      <Chip
                        label={chatPartner.role}
                        size="small"
                        sx={{ textTransform: 'capitalize', height: 18, fontSize: '0.7rem' }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <Typography variant="body2" color="text.secondary">Loading...</Typography>
                )}
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2, bgcolor: '#fafafa' }}>
                {loadingMessages ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : error ? (
                  <Alert severity="error">{error}</Alert>
                ) : messages.length === 0 ? (
                  <Box sx={{ textAlign: 'center', mt: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                      No messages yet. Say hello! 👋
                    </Typography>
                  </Box>
                ) : (
                  messages.map((msg) => {
                    const isMe = msg.sender._id === currentUser.id || msg.sender._id === currentUser._id;
                    return (
                      <Box
                        key={msg._id}
                        sx={{
                          display: 'flex',
                          justifyContent: isMe ? 'flex-end' : 'flex-start',
                          mb: 1.5,
                        }}
                      >
                        {!isMe && (
                          <Avatar sx={{ width: 28, height: 28, mr: 1, mt: 0.5, bgcolor: '#2e7d32', fontSize: '0.75rem' }}>
                            {getInitials(msg.sender.name)}
                          </Avatar>
                        )}
                        <Box sx={{ maxWidth: '65%' }}>
                          <Box
                            sx={{
                              px: 2, py: 1,
                              borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                              bgcolor: isMe ? '#2e7d32' : 'white',
                              color: isMe ? 'white' : 'black',
                              boxShadow: 1,
                            }}
                          >
                            <Typography variant="body2">{msg.content}</Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                            {formatTime(msg.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </Box>

              {/* Message Input */}
              <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'white' }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                  <TextField
                    fullWidth
                    multiline
                    maxRows={3}
                    variant="outlined"
                    placeholder="Type a message... (Enter to send)"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    size="small"
                  />
                  <Button
                    variant="contained"
                    onClick={handleSend}
                    disabled={!newMessage.trim() || sending}
                    sx={{ height: 40, minWidth: 48, px: 2 }}
                  >
                    <SendIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;