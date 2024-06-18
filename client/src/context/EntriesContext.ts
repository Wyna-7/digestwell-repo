import { createContext } from 'react';
import { EntryWithEdit } from '../types';

interface ContextProps {
  entriesList: EntryWithEdit[];
  setEntriesList: React.Dispatch<React.SetStateAction<EntryWithEdit[]>>;
  userId: number | null;
  setUserId: React.Dispatch<React.SetStateAction<null>>;
}

const EntriesContext = createContext<ContextProps>(<ContextProps>{});

export default EntriesContext;
