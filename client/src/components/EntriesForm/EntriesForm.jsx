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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
} from '@mui/material';

import { postEntry } from '../../apiService';

function EntriesForm({ setEntriesList }) {
  const [item, setItem] = useState('');
  const [selectedOption, setSelectedOption] = useState('Food');
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [selectedStoolType, setSelectedStoolType] = useState('');

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSymptoms = (event) => {
    setOtherSymptoms(event.target.value);
    console.log(event.target.value);
  };

  const handleStoolChange = (event) => {
    setSelectedStoolType(event.target.value);
    console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      name: item,
      select: selectedOption,
      other_symptoms: otherSymptoms,
      stool_type: selectedStoolType,
    };
    postEntry(newItem).then((newEntry) => {
      setEntriesList((prevList) => [
        ...prevList,
        { ...newEntry, isEditing: false },
      ]);
      setItem('');
      setSelectedOption('Food');
      setSelectedStoolType('');
      setOtherSymptoms('');
    });
  };
  const handleSubmit2 = (event) => {
    event.preventDefault();
    const newItem = {
      other_symptoms: otherSymptoms,
      stool_type: selectedStoolType,
    };
    postEntry(newItem).then((newEntry) => {
      setEntriesList((prevList) => [
        ...prevList,
        { ...newEntry, isEditing: false },
      ]);
      setSelectedStoolType('');
      setOtherSymptoms('');
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
                onChange={handleTypeChange}
                label='Select an option'
              >
                <MenuItem value='Food'>Food</MenuItem>
                <MenuItem value='Beverage'>Beverage</MenuItem>
                <MenuItem value='Medication'>Medication</MenuItem>
                <MenuItem value='Supplement'>Supplement</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label='Symptoms'
                />
              </FormGroup>
            </Box>
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
        <Paper elevation={10} sx={{ p: 2, pb: 3.2, width: '100%' }}>
          <Box
            component='form'
            onSubmit={handleSubmit2}
            display='flex'
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems='center'
            justifyContent='center'
          >
            <TextField
              type='text'
              name='otherSymptoms'
              value={otherSymptoms}
              onChange={handleSymptoms}
              placeholder='Describe your symptoms'
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
                width: { xs: '100%', sm: '20%' },
              }}
            >
              <InputLabel>Bristol Stool Scale</InputLabel>
              <Select
                value={selectedStoolType}
                onChange={handleStoolChange}
                label='Select an option'
              >
                <MenuItem value='Type 1'>Type 1</MenuItem>
                <MenuItem value='Type 2'>Type 2</MenuItem>
                <MenuItem value='Type 3'>Type 3</MenuItem>
                <MenuItem value='Type 4'>Type 4</MenuItem>
                <MenuItem value='Type 5'>Type 5</MenuItem>
                <MenuItem value='Type 6'>Type 6</MenuItem>
                <MenuItem value='Type 7'>Type 7</MenuItem>
              </Select>
            </FormControl>
            <FormGroup row>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label='Blood in stools'
              />
            </FormGroup>
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Switch defaultChecked />}
                  label='Intakes'
                />
              </FormGroup>
            </Box>
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
