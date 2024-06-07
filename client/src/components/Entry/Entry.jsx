import React from 'react';

const Entry = ({ name, select, createdAt }) => {
  return (
    <div>
      <div>{name}</div>
      <div>{select}</div>
      <di>{createdAt}</di>
    </div>
  );
};

export default Entry;
