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
  const { isEditing, setItemEntry, itemEntry } = props;

  const handleStateChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target;

    setItemEntry((prev: EntryWithEdit) => ({ ...prev, [name]: value }));
  };

  return (
    <Box display='flex' flexDirection='row' alignItems='center' gap={3}>
      {isEditing ? (
        <>
          <TextField
            data-testid='edit-name'
            type='text'
            name='name'
            value={itemEntry?.name}
            onChange={handleStateChange}
            variant='outlined'
            margin='normal'
            fullWidth
            required
          />
          <Select
            aria-label='edit-type'
            data-testid='edit-type'
            name='select'
            value={itemEntry?.select}
            onChange={handleStateChange}
            sx={{ minWidth: 150, mt: 1 }}
          >
            <MenuItem data-testid='id-food' value='Food'>
              Food
            </MenuItem>
            <MenuItem data-testid='id-beverage' value='Beverage'>
              Beverage
            </MenuItem>
            <MenuItem data-testid='id-medication' value='Medication'>
              Medication
            </MenuItem>
            <MenuItem data-testid='id-supplement' value='Supplement'>
              Supplement
            </MenuItem>
          </Select>
          <Select
            data-testid='edit-impact'
            name='health_impact'
            value={itemEntry?.health_impact}
            onChange={handleStateChange}
            sx={{ minWidth: 150, mt: 1 }}
          >
            <MenuItem value='Beneficial'>Beneficial</MenuItem>
            <MenuItem value='Neutral'>Neutral</MenuItem>
            <MenuItem value='Avoid'>Avoid</MenuItem>
          </Select>
        </>
      ) : (
        <>
          <Typography data-testid='item-name' variant='body1' noWrap>
            {itemEntry?.name}
          </Typography>
          {itemEntry?.select && (
            <Typography data-testid='item-select' variant='body1' className='neutral' noWrap>
              {itemEntry?.select}
            </Typography>
          )}
          <Typography
            data-testid='item-health_impact'
            className={`${itemEntry?.health_impact?.toLowerCase()} font-weight-bold`}
            variant='body1'
            noWrap
          >
            {itemEntry?.health_impact}
          </Typography>
        </>
      )}
    </Box>
  );
}
