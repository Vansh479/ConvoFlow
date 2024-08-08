import React, { useState, useEffect } from 'react';
import api from '../api/api';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await api.get('/');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    }

    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(message => (
          <li key={message._id}>
            <strong>{message.user}:</strong> {message.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MessageList;
