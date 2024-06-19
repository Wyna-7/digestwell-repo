import { ChangeEvent } from 'react';
import './style.css';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from '../../../node_modules/@mui/material/index';
import { ConsumedItemEntryProps, EntryWithEdit } from '../../types';

export default function ConsumedItemEntry(props: ConsumedItemEntryProps) {
  let { isEditing, setItemEntry, itemEntry } = props;

  const handleStateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target;

    setItemEntry((prev: EntryWithEdit) => ({ ...prev, [name]: value }));
  };

  return (
    <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
      {isEditing ? (
        <>
          <TextField
            type="text"
            name="name"
            value={itemEntry?.name}
            onChange={handleStateChange}
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Select name="select" value={itemEntry?.select} onChange={handleStateChange} sx={{ minWidth: 150, mt: 1 }}>
            <MenuItem value="Food">Food</MenuItem>
            <MenuItem value="Beverage">Beverage</MenuItem>
            <MenuItem value="Medication">Medication</MenuItem>
            <MenuItem value="Supplement">Supplement</MenuItem>
          </Select>
          <Select
            name="health_impact"
            value={itemEntry?.health_impact}
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
            {itemEntry?.name}
          </Typography>
          {itemEntry?.select && (
            <Typography variant="body1" className="neutral" noWrap>
              {itemEntry?.select}
            </Typography>
          )}
          <Typography className={`${itemEntry?.health_impact?.toLowerCase()} font-weight-bold`} variant="body1" noWrap>
            {itemEntry?.health_impact}
          </Typography>
        </>
      )}
    </Box>
  );
}
