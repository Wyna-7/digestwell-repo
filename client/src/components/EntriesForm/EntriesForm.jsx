import React, { useState } from 'react';

function EntriesForm() {
  const [item, setItem] = useState('');

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleSubmit = (event) => {};
  console.log(item);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='item'
          value={item}
          onChange={handleChange}
          placeholder='What did you consume?'
        />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default EntriesForm;
