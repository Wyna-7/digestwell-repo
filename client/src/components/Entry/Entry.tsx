import { useContext, useState } from 'react';
import { deleteEntry, editEntry } from '../../services/apiService';
import { Box, Paper, Typography } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import './style.css';
import ConsumedItemEntry from '../ConsumedItemEntry/ConsumedItemEntry';
import SymptomsEntry from '../SymptomsEntry/SymptomsEntry';
import EntriesContext from '../../context/EntriesContext';
import { EntryProps } from '../../types';
//TODO change the import of mui when importing several things

export default function Entry(props: EntryProps) {
  const {
    name,
    select,
    createdAt,
    id,
    isEditing,
    health_impact,
    stool_type,
    is_bleeding,
    other_symptoms,
  } = props;

  const { setEntriesList } = useContext(EntriesContext);

  const [itemEntry, setItemEntry] = useState({
    name: name,
    select: select,
    health_impact: health_impact || 'Neutral',
  });

  //TODO change editSymptomsEntry and editConsumedItem
  // const [updatedSymptoms, setUpdatedSymptoms] = useState(symptoms);
  // const [updatedStoolType, setUpdatedStoolType] = useState(stool_type);

  const handleDelete = () => {
    deleteEntry(id, { name, select }).then(() => {
      setEntriesList((prevList: EntryProps[]) =>
        prevList.filter((entry) => entry.id !== id)
      );
    });
  };

  const toggleEdit = () => {
    setEntriesList((prevList: EntryProps[]) =>
      prevList.map((entry) =>
        entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
      )
    );
  };

  const handleSave = async () => {
    await editEntry(id, itemEntry);

    setEntriesList((prevList: EntryProps[]) => {
      const updatedEntries = prevList.map((entry) => {
        if (entry.id === id) {
          return { ...entry, ...itemEntry, isEditing: false };
        } else {
          return entry;
        }
      });
      return updatedEntries;
    });
  };

  //TODO add this edit logic to EditSympromsEntry component
  // const handleSymptoms = (event) => {
  //   setUpdatedSymptoms(event.target.value);
  // };

  // const handleStoolType = (event) => {
  //   setUpdatedStoolType(event.target.value);
  // };

  return (
    <Paper
      elevation={10}
      sx={{ maxWidth: 'md', p: 2, borderRadius: '20px', mb: 2 }}
    >
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        alignItems='flex-start'
      >
        <Box
          display='flex'
          flexDirection='row'
          justifyContent='space-between'
          width='100%'
        >
          <Box display='flex' flexDirection='column' gap={1} flexGrow={1}>
            {(name || select) && (
              <ConsumedItemEntry
                isEditing={isEditing}
                itemEntry={itemEntry}
                setItemEntry={setItemEntry}
              />
            )}
            <SymptomsEntry
              stool_type={stool_type}
              is_bleeding={is_bleeding}
              other_symptoms={other_symptoms}
            />
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
              />
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
              />
            )}
            <DeleteOutlineIcon
              onClick={handleDelete}
              cursor='pointer'
              color='error'
            />
          </Box>
        </Box>
        <Typography
          variant='body2'
          color='textSecondary'
          sx={{ alignSelf: 'flex-end', mt: 2 }}
        >
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
