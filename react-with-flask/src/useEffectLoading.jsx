import React, { useState, useEffect } from 'react';

function DataDisplayComponent() {
  // 1. Initialize state variables
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Default to true so it loads immediately
  const [error, setError] = useState(null);

  useEffect(() => {
    // 2. Define the async fetch function
    const fetchData = async () => {
      try {
        setIsLoading(true); // Turn loader on before API request
        setError(null);     // Reset previous errors

        const response = await fetch('https://example.com');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);    // Store API result
      } catch (err) {
        setError(err.message); // Handle errors gracefully
      } finally {
        setIsLoading(false); // Turn loader off whether request succeeded or failed
      }
    };

    fetchData();
  }, []); // Empty array ensures this only runs once when component mounts

  // 3. Conditional Rendering Based on States
  if (isLoading) {
    return <div className="spinner">Loading data, please wait...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="content">
      <h1>Data Loaded Successfully!</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplayComponent;