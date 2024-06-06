import { useEffect } from 'react';
import './App.css';
import { getEntries } from './apiService';

function App() {
  useEffect(() => {
    getEntries().then(console.log());
  }, []);

  return (
    <>
      <h1>Hello from the App</h1>
    </>
  );
}

export default App;
