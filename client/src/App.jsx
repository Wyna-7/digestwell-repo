import { useEffect, useState } from 'react';
import './App.css';
import { getEntries } from './apiService';
import EntriesForm from './components/EntriesForm/EntriesForm';
import EntriesList from './components/EntriesList/EntriesList';
import { Box, Container } from '@mui/material';

function App() {
  const [entriesList, setEntriesList] = useState([]);

  useEffect(() => {
    getEntries().then((data) =>
      // isEditing: false --> all entries start in view mode (not editable)
      setEntriesList(data.map((entry) => ({ ...entry, isEditing: false })))
    );
  }, []);

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
      >
        <EntriesForm setEntriesList={setEntriesList} />
        <EntriesList
          entriesList={entriesList}
          setEntriesList={setEntriesList}
        />
      </Box>
    </Container>
  );
}

export default App;
