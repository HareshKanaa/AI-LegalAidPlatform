import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleChat = async () => {
    const res = await axios.post('http://localhost:5000/api/chat', { query });
    setResponse(res.data.response);
  };

  const generateWill = async () => {
    await axios.post('http://localhost:5000/api/generate_will', { name, address });
    alert('Will generated at output/will.pdf!');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI Legal Aid Demo</h1>
      <div>
        <h2>Chatbot</h2>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Ask a legal question..."
        />
        <button onClick={handleChat}>Ask</button>
        <p>{response}</p>
      </div>
      <div>
        <h2>Generate Will</h2>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <button onClick={generateWill}>Generate</button>
      </div>
    </div>
  );
}

export default App;