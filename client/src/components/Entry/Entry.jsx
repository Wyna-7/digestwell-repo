import React, { useState } from 'react';
import { deleteEntry, editEntry } from '../../apiService';
const Entry = ({ name, select, createdAt, id, isEditing, setEntriesList }) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSelect, setUpdatedSelect] = useState(select);

  const handleDelete = () => {
    deleteEntry(id).then(() => {
      setEntriesList((prevList) => prevList.filter((entry) => entry.id !== id));
    });
  };

  //switch the entry between view and edit mode
  const toggleEdit = () => {
    setEntriesList((prevList) =>
      prevList.map((entry) =>
        // check if the current entry's id matches with id of the entry to edit.
        // if match, creates a copy of the current entry with ...entry.
        // toggles the editing mode of isEditing to true for edit mode, false for view mode.
        entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
      )
    );
  };

  const handleSave = async () => {
    // updated values, used to update the backend and frontend.
    const editedEntry = {
      name: updatedName,
      select: updatedSelect,
    };

    // update entry on the server
    await editEntry(id, editedEntry);
    // updates entriesList state (UI).
    // prevList --> current state of entriesList, before modification
    setEntriesList((prevList) => {
      const updatedEntries = prevList.map((entry) => {
        // check if current entry matches with entry being edited.
        if (entry.id === id) {
          return { ...entry, ...editedEntry, isEditing: false };
        } else {
          return entry;
        }
      });
      // returns updatedEntries array to setEntriesList
      return updatedEntries;
    });
  };

  const handleChangeName = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setUpdatedSelect(event.target.value);
  };

  return (
    <div>
      <ul>
        <li>
          Name:
          {isEditing ? (
            <input
              type='text'
              value={updatedName}
              onChange={handleChangeName}
            />
          ) : (
            <span>{name}</span>
          )}
        </li>
        <li>
          Type:
          {isEditing ? (
            <select value={updatedSelect} onChange={handleChangeSelect}>
              <option value='Food'>Food</option>
              <option value='Beverage'>Beverage</option>
              <option value='Medication'>Medication</option>
              <option value='Supplement'>Supplement</option>
            </select>
          ) : (
            <span>{select}</span>
          )}
        </li>
        <li>Added on {new Date(createdAt).toLocaleString()}</li>
      </ul>
      <div>
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={toggleEdit}>Edit</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Entry;
