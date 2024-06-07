import { useEffect, useState } from 'react';
import './App.css';
import { getEntries } from './apiService';
import EntriesForm from './components/EntriesForm/EntriesForm';
import EntriesList from './components/EntriesList/EntriesList';

function App() {
  const [entriesList, setEntriesList] = useState([]);

  useEffect(() => {
    getEntries().then((data) =>
      // isEditing: false --> all entries start in view mode (not editable)
      setEntriesList(data.map((entry) => ({ ...entry, isEditing: false })))
    );
  }, []);

  return (
    <>
      <EntriesForm setEntriesList={setEntriesList} />
      <EntriesList entriesList={entriesList} setEntriesList={setEntriesList} />
    </>
  );
}

export default App;
