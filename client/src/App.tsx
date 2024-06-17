import { useEffect, useState } from 'react';
import './App.css';
import { getEntries } from './apiService';
import EntriesContext from './context/EntriesContext';
import EntriesForm from './components/EntriesForm/EntriesForm';
import EntriesList from './components/EntriesList/EntriesList';
import Header from './components/Header/Header';
import MyLists from './components/pages/MyLists/MyLists';
import SignIn from './components/pages/LoginPage/LoginPage';
import { Container, Box } from '../node_modules/@mui/material/index';
import { BrowserRouter as Router, Route, Routes } from '../node_modules/react-router-dom/dist/index';

function App() {
  const [entriesList, setEntriesList] = useState<object[]>([]);

  //TODO userId is hardcoded
  const userId = 8;

  useEffect(() => {
    getEntries(userId).then((data) =>
      // isEditing: false --> all entries start in view mode (not editable)
      setEntriesList(data.map((entry: { id: number; createdAt: string; name: string; select: string; health_impact: string; stool_type: string; is_bleeding: boolean; other_symptoms: string; userId: number; itemId: number }) => ({ ...entry, isEditing: false })))
    );
  }, []);

  return (
    //TODO userID is hardcoded
    <EntriesContext.Provider value={{ entriesList, setEntriesList, userId }}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/my-lists' element={<MyLists />} />
          <Route
            path='/dashboard'
            element={
              <Container>
                <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center' minHeight='100vh' padding={2}>
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
