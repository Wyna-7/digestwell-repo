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
    // <Container>
    //   <Box
    //     display='flex'
    //     flexDirection='column'
    //     alignItems='center'
    //     justifyContent='center'
    //     width='100%'
    //     maxWidth={1200}
    //   >
    //     <Paper elevation={10} sx={{ p: 2, pb: 3.2, width: '100%', mb: 2 }}>
    //       <Box
    //         display='flex'
    //         flexDirection='row'
    //         justifyContent='space-between'
    //         alignContent='center'
    //       >
    //         <Box display='flex' gap={5}>
    //           <Box>
    //             {isEditing ? (
    //               <TextField
    //                 type='text'
    //                 value={updatedName}
    //                 onChange={handleChangeName}
    //                 variant='outlined'
    //                 margin='normal'
    //                 sx={{
    //                   width: '100%',
    //                 }}
    //                 required
    //               />
    //             ) : (
    //               <Typography variant='body1' noWrap>
    //                 {name}
    //               </Typography>
    //             )}
    //           </Box>
    //           <Box>
    //             {isEditing ? (
    //               <Select value={updatedSelect} onChange={handleChangeSelect}>
    //                 <MenuItem value='Food'>Food</MenuItem>
    //                 <MenuItem value='Beverage'>Beverage</MenuItem>
    //                 <MenuItem value='Medication'>Medication</MenuItem>
    //                 <MenuItem value='Supplement'>Supplement</MenuItem>
    //               </Select>
    //             ) : (
    //               <Typography variant='body1' noWrap>
    //                 {select}
    //               </Typography>
    //             )}
    //           </Box>
    //           <Box>{new Date(createdAt).toLocaleString()}</Box>
    //         </Box>
    //         <Box display='flex' flexDirection='row'>
    //           {isEditing ? (
    //             <Button onClick={handleSave}>Save</Button>
    //           ) : (
    //             <EditCalendarIcon
    //               sx={{
    //                 cursor: 'pointer',
    //                 color: 'secondary.main',
    //                 '&:hover': { color: 'primary.dark' },
    //               }}
    //               onClick={toggleEdit}
    //             >
    //               Edit
    //             </EditCalendarIcon>
    //           )}
    //           <DeleteOutlineIcon
    //             sx={{
    //               cursor: 'pointer',
    //               color: 'secondary.main',
    //               '&:hover': { color: 'error.main' },
    //             }}
    //             onClick={handleDelete}
    //           >
    //             Delete
    //           </DeleteOutlineIcon>
    //         </Box>
    //       </Box>
    //     </Paper>
    //   </Box>
    // </Container>

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
                <Select
                  value={updatedSelect}
                  onChange={handleChangeSelect}
                  sx={{ minWidth: 150, mr: 2, mt: 1 }}
                >
                  <MenuItem value='Food'>Food</MenuItem>
                  <MenuItem value='Beverage'>Beverage</MenuItem>
                  <MenuItem value='Medication'>Medication</MenuItem>
                  <MenuItem value='Supplement'>Supplement</MenuItem>
                </Select>
              ) : (
                <Typography
                  variant='body1'
                  sx={{ color: 'primary.main' }}
                  noWrap
                >
                  {select}
                </Typography>
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
      </Paper>
    </Container>
  );
};

export default Entry;
