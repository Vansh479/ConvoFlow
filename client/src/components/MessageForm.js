import React, { useState } from 'react';
import api from '../api/api';
import { TextField, Button, Box, Paper, Typography } from '@mui/material';

function MessageForm() {
  const [user, setUser] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/', { user, text });
      setUser('');
      setText('');
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h6" gutterBottom>
        Send a Message
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Your Name"
            variant="outlined"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <TextField
            label="Your Message"
            variant="outlined"
            multiline
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!user.trim() || !text.trim()}
          >
            Send
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default MessageForm;
