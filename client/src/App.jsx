import { useEffect } from 'react';
import './App.css';
import EntriesForm from './components/EntriesForm/EntriesForm';
import { getEntries } from './apiService';

function App() {
  useEffect(() => {
    getEntries().then((data) => console.log(data));
  }, []);

  return (
    <>
      <EntriesForm />
    </>
  );
}

export default App;
