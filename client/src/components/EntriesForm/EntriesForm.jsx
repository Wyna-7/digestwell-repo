import React, { useState } from 'react';
import { postEntry } from '../../apiService';

function EntriesForm({ setEntriesList }) {
  const [item, setItem] = useState('');
  const [selectedOption, setSelectedOption] = useState('Food');

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = { name: item, select: selectedOption };
    postEntry(newItem).then((newEntry) => {
      setEntriesList((prevList) => [
        ...prevList,
        { ...newEntry, isEditing: false },
      ]);
      setItem('');
      setSelectedOption('Food');
    });
  };

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
        <div>
          <label>Select an option</label>
          <select value={selectedOption} onChange={handleDropdownChange}>
            <option value='Food'>Food</option>
            <option value='Beverage'>Beverage</option>
            <option value='Medication'>Medication</option>
            <option value='Supplement'>Supplement</option>
          </select>
        </div>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default EntriesForm;
