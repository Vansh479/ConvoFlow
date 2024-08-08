import React, { useState } from 'react';
import api from '../api/api';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your message"
        required
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default MessageForm;
