/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { deleteEntry, editEntry } from '../../apiService';
import {
  Button,
  Container,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { blue } from '@mui/material/colors';

const Entry = ({
  name,
  select,
  createdAt,
  id,
  isEditing,
  health_impact,
  setEntriesList,
  symptoms,
}) => {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSelect, setUpdatedSelect] = useState(select);
  const [updatedHealthImpact, setUpdatedHealthImpact] = useState(
    health_impact || 'Neutral'
  );

  console.log('my symptoms', symptoms[0].stool_type);
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
      health_impact: updatedHealthImpact,
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

  function colorPicker(value) {
    switch (value) {
      case 'Beneficial':
        return {
          color: 'green',
          fontWeight: 'bold',
        };
      case 'Neutral':
        return {
          color: 'secondary.main',
          fontWeight: 'bold',
        };
      case 'Avoid':
        return {
          color: 'red',
          fontWeight: 'bold',
        };
      default:
        return blue;
    }
  }

  const handleChangeName = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setUpdatedSelect(event.target.value);
  };

  //to add health impact when editing an entry
  const handleHealthImpact = (event) => {
    setUpdatedHealthImpact(event.target.value);
  };

  return (
    <Container maxWidth='md' sx={{ mb: 2 }}>
      <Paper elevation={10} sx={{ p: 2 }}>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Box display='flex' flexDirection='column' gap={1} flexGrow={1}>
            <Box display='flex' flexDirection='row' alignItems='center' gap={3}>
              {isEditing ? (
                <TextField
                  type='text'
                  value={updatedName}
                  onChange={handleChangeName}
                  variant='outlined'
                  margin='normal'
                  fullWidth
                  required
                />
              ) : (
                <Typography variant='body1' noWrap>
                  {name}
                </Typography>
              )}
              {isEditing ? (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Select
                    value={updatedSelect}
                    onChange={handleChangeSelect}
                    sx={{ minWidth: 150, mt: 1 }}
                  >
                    <MenuItem value='Food'>Food</MenuItem>
                    <MenuItem value='Beverage'>Beverage</MenuItem>
                    <MenuItem value='Medication'>Medication</MenuItem>
                    <MenuItem value='Supplement'>Supplement</MenuItem>
                  </Select>
                  <Select
                    value={updatedHealthImpact}
                    onChange={handleHealthImpact}
                    sx={{ minWidth: 150, mt: 1 }}
                  >
                    <MenuItem value='Beneficial'>Beneficial</MenuItem>
                    <MenuItem value='Neutral'>Neutral</MenuItem>
                    <MenuItem value='Avoid'>Avoid</MenuItem>
                  </Select>
                </Box>
              ) : (
                <>
                  <Typography
                    variant='body1'
                    sx={{ color: 'primary.main' }}
                    noWrap
                  >
                    {select}
                  </Typography>
                  <Typography
                    variant='body1'
                    sx={{
                      // changes the color depending on the selected health impact
                      color: colorPicker(health_impact),
                    }}
                    noWrap
                  >
                    {health_impact}
                  </Typography>
                </>
              )}
            </Box>
            <Typography variant='body2' color='textSecondary'>
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </Box>
          <Box display='flex' flexDirection='row' gap={1}>
            {isEditing ? (
              <BookmarkAddedIcon
                onClick={handleSave}
                sx={{
                  cursor: 'pointer',
                  color: 'primary.dark',
                  '&:hover': {
                    color: 'secondary.main',
                  },
                }}
              ></BookmarkAddedIcon>
            ) : (
              <EditCalendarIcon
                onClick={toggleEdit}
                sx={{
                  cursor: 'pointer',
                  color: 'secondary.main',
                  '&:hover': {
                    color: 'primary.dark',
                  },
                }}
              ></EditCalendarIcon>
            )}
            <DeleteOutlineIcon
              onClick={handleDelete}
              cursor='pointer'
              color='error'
            ></DeleteOutlineIcon>
          </Box>
        </Box>
        <Typography variant='body2' color='textSecondary'>
          {symptoms[0].stool_type}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {symptoms[0].other_symptoms}
        </Typography>

        <Typography variant='body2' color='textSecondary'>
          {symptoms[0].is_bleeding}
        </Typography>
      </Paper>
    </Container>
  );
};

export default Entry;
