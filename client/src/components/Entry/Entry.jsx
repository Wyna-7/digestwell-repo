import { useContext, useState } from 'react';
import { deleteEntry, editEntry } from '../../apiService';
import { Box, Paper, Typography } from '@mui/material';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { blue } from '@mui/material/colors';
import './style.css';
import ConsumedItemEntry from '../ConsumedItemEntry/ConsumedItemEntry';
import SymptomsEntry from '../SymptomsEntry/SymptomsEntry';
import EntriesContext from '../../context/EntriesContext';

export default function Entry({
  name,
  select,
  createdAt,
  id,
  isEditing,
  health_impact,

  symptoms,
  stool_type,
  is_bleeding,
  other_symptoms,
}) {
  const { setEntriesList } = useContext(EntriesContext);

  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSelect, setUpdatedSelect] = useState(select);
  const [updatedHealthImpact, setUpdatedHealthImpact] = useState(
    health_impact || 'Neutral'
  );
  // const [updatedSymptoms, setUpdatedSymptoms] = useState(symptoms);
  // const [updatedStoolType, setUpdatedStoolType] = useState(stool_type);

  const handleDelete = () => {
    deleteEntry(id).then(() => {
      setEntriesList((prevList) => prevList.filter((entry) => entry.id !== id));
    });
  };

  const toggleEdit = () => {
    console.log('in toggle edit');
    setEntriesList((prevList) =>
      prevList.map((entry) =>
        entry.id === id ? { ...entry, isEditing: !entry.isEditing } : entry
      )
    );
  };

  const handleSave = async () => {
    const editedEntry = {
      name: updatedName,
      select: updatedSelect,
      health_impact: updatedHealthImpact,
      // other_symptoms: updatedSymptoms,
      // stool_type: updatedStoolType,
    };

    await editEntry(id, editedEntry);

    setEntriesList((prevList) => {
      const updatedEntries = prevList.map((entry) => {
        if (entry.id === id) {
          return { ...entry, ...editedEntry, isEditing: false };
        } else {
          return entry;
        }
      });
      return updatedEntries;
    });
  };

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
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          width="100%"
        >
          <Box display="flex" flexDirection="column" gap={1} flexGrow={1}>
            {(name || select) && (
              <ConsumedItemEntry
                name={name}
                isEditing={isEditing}
                select={select}
                health_impact={health_impact}
              />
            )}
            <SymptomsEntry
              stool_type={stool_type}
              is_bleeding={is_bleeding}
              other_symptoms={other_symptoms}
            />
          </Box>

          <Box display="flex" flexDirection="row" gap={1}>
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
              cursor="pointer"
              color="error"
            />
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ alignSelf: 'flex-end', mt: 2 }}
        >
          {new Date(createdAt).toLocaleString()}
        </Typography>
      </Box>
    </Paper>
  );
}
