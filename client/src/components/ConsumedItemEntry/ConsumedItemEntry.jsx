import { useState } from 'react';
import { Box, TextField, Select, MenuItem, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';
import './style.css';

export default function ConsumedItemEntry({
  name,
  isEditing,
  select,
  health_impact,
}) {
  const [updatedName, setUpdatedName] = useState(name);
  const [updatedSelect, setUpdatedSelect] = useState(select);
  const [updatedHealthImpact, setUpdatedHealthImpact] = useState(
    health_impact || 'Neutral'
  );

  const handleChangeName = (event) => {
    setUpdatedName(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setUpdatedSelect(event.target.value);
  };

  const handleHealthImpact = (event) => {
    setUpdatedHealthImpact(event.target.value);
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

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
      {isEditing ? (
        <>
          <TextField
            type="text"
            value={updatedName}
            onChange={handleChangeName}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Select
            value={updatedSelect}
            onChange={handleChangeSelect}
            sx={{ minWidth: 150, mt: 1 }}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
            <MenuItem value="Medication">Medication</MenuItem>
            <MenuItem value="Supplement">Supplement</MenuItem>
          </Select>
          <Select
            value={updatedHealthImpact}
            onChange={handleHealthImpact}
            sx={{ minWidth: 150, mt: 1 }}
          >
            <MenuItem value="Beneficial">Beneficial</MenuItem>
            <MenuItem value="Neutral">Neutral</MenuItem>
            <MenuItem value="Avoid">Avoid</MenuItem>
          </Select>
        </>
      ) : (
        <>
          <Typography variant="body1" noWrap>
            {name}
          </Typography>
          {select && (
            <Typography variant="body1" sx={{ color: 'primary.main' }} noWrap>
              {select}
            </Typography>
          )}
          <Typography
            variant="body1"
            sx={{
              color: colorPicker(health_impact),
            }}
            noWrap
          >
            {health_impact}
          </Typography>
        </>
      )}
    </Box>
  );
}
