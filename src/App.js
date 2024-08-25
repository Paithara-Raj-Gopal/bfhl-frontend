import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      // Validate JSON input
      const parsedInput = JSON.parse(input);

      // Call your API endpoint
      const result = await axios.post('https://bfhl-backend-d03fq2r6p-paithara-raj-gopals-projects.vercel.app', parsedInput);
      setResponse(result.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.includes('alphabets') && (
          <div>
            <h3>Alphabets:</h3>
            <p>{response.alphabets.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('numbers') && (
          <div>
            <h3>Numbers:</h3>
            <p>{response.numbers.join(', ')}</p>
          </div>
        )}
        {selectedOptions.includes('highest_lowercase_alphabet') && (
          <div>
            <h3>Highest Lowercase Alphabet:</h3>
            <p>{response.highest_lowercase_alphabet.join(', ')}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Data Processor</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter JSON data"
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <h2>Select fields to display:</h2>
          <Select
            isMulti
            options={options}
            onChange={(selected) => setSelectedOptions(selected.map(option => option.value))}
          />
          {renderResponse()}
        </div>
      )}
    </div>
  );
}

export default App;