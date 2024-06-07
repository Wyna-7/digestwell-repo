import React from 'react';
import Entry from '../Entry/Entry';

const EntriesList = ({ entriesList }) => {
  console.log('Rendering EntriesList with:', entriesList);
  return (
    <ul>
      {entriesList.map((entry) => (
        <li key={entry.id}>
          <Entry {...entry} />
        </li>
      ))}
    </ul>
  );
};

export default EntriesList;
