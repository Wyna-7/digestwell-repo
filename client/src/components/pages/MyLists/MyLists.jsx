import React, { useContext } from 'react';
import HealthImpactTable from '../../Table/HealthImpactTable';
import EntriesContext from '../../../entriesContext';
import './style.css';

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
