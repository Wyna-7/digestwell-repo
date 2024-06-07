import React from 'react';

const Entry = ({ name, select, createdAt }) => {
  const handleEdit = (event) => {
    // do something
  };

  return (
    <div>
      <div>
        <div>{name}</div>
        <div>{select}</div>
        <div>{createdAt}</div>
      </div>

      <div>
        <button onClick={handleEdit}>👏</button>
      </div>
      <div>
        <button>⏹️</button>
      </div>
    </div>
  );
};

export default Entry;
