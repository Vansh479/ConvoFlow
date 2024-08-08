import React from 'react';
import MessageList from './components/MessageList';
import MessageForm from './components/MessageForm';

function App() {
  return (
    <div>
      <h1>Messaging App</h1>
      <MessageForm />
      <MessageList />
    </div>
  );
}

export default App;
