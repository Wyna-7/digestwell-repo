import { useEffect } from 'react';
import './App.css';
import { getEntries } from './apiService';

function App() {
  useEffect(() => {
    getEntries().then((data) => console.log(data));
  }, []);

  return (
    <>
      <h1>Hello from the App</h1>
    </>
  );
}

export default App;
