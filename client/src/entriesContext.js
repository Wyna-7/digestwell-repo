import React from 'react';

const EntriesContext = React.createContext({
  entriesList: [],
  setEntriesList: () => {},
});

export default EntriesContext;
