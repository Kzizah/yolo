import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

import Header from './Header';
import ProductControl from './ProductControl';
import AboutUs from './AboutUs';
import Footer from './Footer';

function App() {
  const [data, setData] = useState(null); // State to store fetched data

  useEffect(() => {
    // Function to fetch data from an API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data'); // Replace with your API endpoint
        setData(response.data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when component mounts
  }, []);

  return (
    <div className="container-fluid">
      <Header />
      <ProductControl />
      <AboutUs />
      <Footer />

      {/* Display fetched data */}
      <div className="data-container">
        <h2>Fetched Data</h2>
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default App;
