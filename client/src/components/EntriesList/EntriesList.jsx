import { useContext } from 'react';
import Entry from '../Entry/Entry';
import { Container, Box } from '@mui/material';
import './style.css';
import EntriesContext from '../../context/EntriesContext';

const EntriesList = () => {
  const { entriesList } = useContext(EntriesContext);

  return (
    <Container className='entriesList-container'>
      <Box className='entriesList-box'>
        <Box className='entriesList-ul' component='ul'>
          {entriesList.map((entry) => (
            <Entry component='li' key={entry.id} {...entry} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default EntriesList;
