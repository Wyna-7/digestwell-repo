import React from 'react';
import Entry from '../Entry/Entry';

const EntriesList = ({ entriesList, setEntriesList }) => {
  console.log('Rendering EntriesList with:', entriesList);
  return (
    <ul>
      {entriesList.map((entry) => (
        <li key={entry.id}>
          <Entry {...entry} setEntriesList={setEntriesList} />
        </li>
      ))}
    </ul>
  );
};

export default EntriesList;
