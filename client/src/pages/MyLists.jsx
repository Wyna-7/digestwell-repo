import React, { useContext } from 'react';
import HealthImpactTable from '../components/Table/HealthImpactTable';
import EntriesContext from '../context/EntriesContext';

const MyLists = () => {
  const { entriesList, setEntriesList } = useContext(EntriesContext);

  console.log('entriesList in MyLists:', entriesList);

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
