import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';


const BASE_URL = 'http://localhost:3001';
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/api/data`)
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Data from API:</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Loading...'}
    </div>
  );
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <App/>
  </StrictMode>
);
