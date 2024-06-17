import { useContext } from 'react';
import Entry from '../Entry/Entry';
import { Container, Box } from '@mui/material';
import './style.css';
import EntriesContext from '../../context/EntriesContext';
import { isItem } from '../../apiService';

const EntriesList = () => {
  const { entriesList } = useContext(EntriesContext);

  return (
    <Container className='entriesList-container'>
      <Box className='entriesList-box'>
        <Box className='entriesList-ul' component='ul'>
          {entriesList.map((entry: { name: string; select: string; other_symptoms: string; stool_type: string; is_bleeding: boolean; userId: number; id: number }) => (
            <Entry component='li' key={isItem(entry) ? 'i' + entry.id : 's' + entry.id} {...entry} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default EntriesList;
