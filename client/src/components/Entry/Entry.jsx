import React from 'react';
import { deleteEntry } from '../../apiService';
const Entry = ({ name, select, createdAt, id, setEntriesList }) => {
  const handleDelete = (event) => {
    deleteEntry(id).then(() => {
      setEntriesList((prevList) => prevList.filter((entry) => entry.id !== id));
    });
  };
  return (
    <div>
      <div>
        <div>{name}</div>
        <div>{select}</div>
        <div>{createdAt}</div>
      </div>

      <div>
        <button>👏</button>
      </div>
      <div>
        <button onClick={handleDelete}>🗑️</button>
      </div>
    </div>
  );
};

export default Entry;
