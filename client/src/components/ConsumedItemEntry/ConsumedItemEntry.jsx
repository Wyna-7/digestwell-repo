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
  const [state, setState] = useState({
    itemName: name,
    itemType: select,
    healthImpact: health_impact || 'Neutral',
  });

  // const [updatedName, setUpdatedName] = useState(name);
  // const [updatedSelect, setUpdatedSelect] = useState(select);
  // const [updatedHealthImpact, setUpdatedHealthImpact] = useState(
  //   health_impact || 'Neutral'
  // );

  const handleStateChange = (event) => {
    console.log(event);
    const { name, value } = event.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
      {isEditing ? (
        <>
          <TextField
            type="text"
            name="itemName"
            value={state.itemName}
            onChange={handleStateChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Select
            name="itemType"
            value={state.itemType}
            onChange={handleStateChange}
            sx={{ minWidth: 150, mt: 1 }}
          >
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
            <MenuItem value="Medication">Medication</MenuItem>
            <MenuItem value="Supplement">Supplement</MenuItem>
          </Select>
          <Select
            name="healthImpact"
            value={state.healthImpact}
            onChange={handleStateChange}
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
            {state.itemName}
          </Typography>
          {state.itemType && (
            <Typography variant="body1" className="neutral" noWrap>
              {state.itemType}
            </Typography>
          )}
          <Typography
            className={`${state.healthImpact.toLowerCase()} font-weight-bold`}
            variant="body1"
            noWrap
          >
            {state.healthImpact}
          </Typography>
        </>
      )}
    </Box>
  );
}
