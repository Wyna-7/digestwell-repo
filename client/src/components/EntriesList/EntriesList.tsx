import { useContext } from 'react';
import Entry from '../Entry/Entry';
import { Container, Box } from '@mui/material';
import './style.css';
import EntriesContext from '../../context/EntriesContext';
import { isItem } from '../../services/apiService';
import { EntryFromDataBase, EntryWithEdit } from '../../types';

const EntriesList = () => {
  const { entriesList } = useContext(EntriesContext);

  const sortedEntries = entriesList.sort((a: EntryFromDataBase, b: EntryFromDataBase): number => {
    const c: number = Number(new Date(a.createdAt));
    const d: number = Number(new Date(b.createdAt));
    return d - c;
  });

  console.log('IN ENTRIESLIST', entriesList);

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
