import React, { useContext } from 'react';
import Header from '../Header/Header';
import HealthImpactTable from '../Table/HealthImpactTable';
import EntriesContext from '../../entriesContext';

const MyLists = () => {
  const { entriesList, setEntriesList } = useContext(EntriesContext);

  console.log('entriesList in MyLists:', entriesList); // Check if data exists

  return (
    <div>
      <HealthImpactTable
        entriesList={entriesList}
        setEntriesList={setEntriesList}
      />
    </div>
  );
};

export default MyLists;
