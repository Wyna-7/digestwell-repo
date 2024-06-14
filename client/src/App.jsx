import { useEffect, useState } from 'react';
import './App.css';
import { getEntries } from './apiService';
import EntriesForm from './components/EntriesForm/EntriesForm';
import EntriesList from './components/EntriesList/EntriesList';
import EntriesContext from './context/EntriesContext';
import Header from './components/Header/Header';
import { Box, Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyLists from './components/pages/MyLists/MyLists';
import SignIn from './components/pages/LoginPage/LoginPage';

function App() {
  const [entriesList, setEntriesList] = useState([]);
  const userId = 8;
  console.log('entries list from App.jsx', entriesList);

  useEffect(() => {
    getEntries().then((data) =>
      // isEditing: false --> all entries start in view mode (not editable)
      setEntriesList(data.map((entry) => ({ ...entry, isEditing: false })))
    );
  }, []);

  entriesList.forEach((entry) => {
    if (entry.symptoms) {
      entry.symptoms.forEach((symptom) => {
        console.log('stool_type from ', symptom.stool_type);
      });
    }
  });

  return (
    //TODO userID is hardcoded
    <EntriesContext.Provider value={{ entriesList, setEntriesList, userId }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/my-lists" element={<MyLists />} />
          <Route
            path="/dashboard"
            element={
              <Container>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  minHeight="100vh"
                  padding={2}
                >
                  <EntriesForm />
                  <EntriesList />
                </Box>
              </Container>
            }
          />
        </Routes>
      </Router>
    </EntriesContext.Provider>
  );
}

export default App;
