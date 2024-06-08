import { useState } from 'react';
import {
  Button,
  Container,
  Box,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

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
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 'none',
        width: '100%',
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        height={300}
        width='100%'
        maxWidth={1200}
      >
        <Paper elevation={10} sx={{ p: 2, pb: 3.2, width: '100%' }}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            display='flex'
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems='center'
            justifyContent='center'
          >
            <TextField
              type='text'
              name='item'
              value={item}
              onChange={handleChange}
              placeholder='What did you consume?'
              variant='outlined'
              margin='normal'
              sx={{
                mr: { sm: 2 },
                mb: { xs: 2, sm: 0 },
                width: { xs: '100%', sm: '50%' },
              }}
              required
            />
            <FormControl
              variant='outlined'
              margin='normal'
              sx={{
                mr: { sm: 2 },
                mb: { xs: 2, sm: 0 },
                minWidth: 150,
                width: { xs: '100%', sm: '25%' },
              }}
            >
              <InputLabel>Select an option</InputLabel>
              <Select
                value={selectedOption}
                onChange={handleDropdownChange}
                label='Select an option'
              >
                <MenuItem value='Food'>Food</MenuItem>
                <MenuItem value='Beverage'>Beverage</MenuItem>
                <MenuItem value='Medication'>Medication</MenuItem>
                <MenuItem value='Supplement'>Supplement</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  height: 'fit-content',
                  alignSelf: 'center',
                  mt: 1.5,
                }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default EntriesForm;
