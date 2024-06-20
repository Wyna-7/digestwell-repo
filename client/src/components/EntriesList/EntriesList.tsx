import { useContext } from 'react';
import Entry from '../Entry/Entry';
import { Container, Box } from '@mui/material';
import './style.css';
import EntriesContext from '../../context/EntriesContext';
import { isItem } from '../../services/apiService';
import { EntryFromDataBase, EntryWithEdit } from '../../types';

const EntriesList = () => {
  const { entriesList } = useContext(EntriesContext);

  //TODO use fsn library for the sorting
  const sortedEntries = entriesList.sort((a: EntryFromDataBase, b: EntryFromDataBase): number => {
    const c: number = (new Date(a.createdAt)).getTime();
    const d: number = (new Date(b.createdAt)).getTime();
    return d - c;
  });

  return (
    <Container className="entriesList-container">
      <Box className="entriesList-box">
        <Box className="entriesList-ul" component="ul">
          {sortedEntries.map((entry: EntryWithEdit) => (
            <Entry key={isItem(entry) ? 'i' + entry.id : 's' + entry.id} {...entry} />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default EntriesList;
