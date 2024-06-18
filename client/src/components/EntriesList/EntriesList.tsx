import { useContext } from 'react';
import Entry from '../Entry/Entry';
import { Container, Box } from '@mui/material';
import './style.css';
import EntriesContext from '../../context/EntriesContext';
import { isItem } from '../../services/apiService';
import { EntryWithEdit } from '../../types';

const EntriesList = () => {
  const { entriesList } = useContext(EntriesContext);

  return (
    <Container className="entriesList-container">
      <Box className="entriesList-box">
        <Box className="entriesList-ul" component="ul">
          {entriesList.map((entry: EntryWithEdit) => (
            <Entry component="li" key={isItem(entry) ? 'i' + entry.id : 's' + entry.id} {...entry} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default EntriesList;
