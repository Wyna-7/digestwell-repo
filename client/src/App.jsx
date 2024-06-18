import { useEffect, useState } from 'react';
import './App.css';
import { getEntries } from './services/apiService';
import { auth } from './services/authService';
import EntriesForm from './components/EntriesForm/EntriesForm';
import EntriesList from './components/EntriesList/EntriesList';
import EntriesContext from './context/EntriesContext';
import Header from './components/Header/Header';
import { Box, Container } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyLists from './pages/MyLists';
import SignIn from './pages/LoginPage';
import Register from './pages/Register';
import Logout from './pages/Logout';

function App() {
  const [userId , setUserId] = useState(null);
  const [entriesList, setEntriesList] = useState([]);

  useEffect(() => {
    async function startup () {
      const res = await auth();
      if (res.status === 200) {
        const resData = await res.json();
        setUserId(resData.userId);
        getEntries(resData.userId).then((data) =>
          // isEditing: false --> all entries start in view mode (not editable)
          setEntriesList(data.map((entry) => ({ ...entry, isEditing: false })))
        );
      }
    }
    startup();
  }, []);
    
  return (
    <EntriesContext.Provider value={{ entriesList, setEntriesList, userId, setUserId }}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<SignIn />} />
          <Route path='/register' element={<Register />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/my-lists' element={<MyLists />} />
          <Route
            path='/dashboard'
            element={
              <Container>
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                  justifyContent='center'
                  minHeight='100vh'
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
