import { createContext } from 'react';
import { EntryFromDataBase, EntryWithEdit } from '../types';

interface ContextProps {
  entriesList: EntryWithEdit[];
  setEntriesList: React.Dispatch<React.SetStateAction<EntryWithEdit[]>>;
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<null>>;
  itemEntry: EntryFromDataBase;
  setItemEntry: React.Dispatch<React.SetStateAction<EntryFromDataBase>>;
}

const EntriesContext = createContext<ContextProps>(<ContextProps>{});

export default EntriesContext;
