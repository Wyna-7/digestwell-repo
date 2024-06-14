import { useContext, useState } from 'react';
import {
  Button,
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
} from '@mui/material';

import { postEntry } from '../../apiService';
import './style.css';
import EntriesContext from '../../context/EntriesContext';

function EntriesForm() {
  const { setEntriesList, userId } = useContext(EntriesContext);

  const [formData, setFormData] = useState({
    item: '',
    selectedOption: '',
    otherSymptoms: '',
    selectedStoolType: '',
    bloodInStool: false,
  });

  const handleChange = (event) => {
    let { name, value } = event.target;

    if (name === 'bloodInStool') {
      value = value === 'true';
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.item &&
      !formData.otherSymptoms &&
      !formData.selectedStoolType
    ) {
      alert(
        'Please fill either the item and select option or other symptoms and stool type.'
      );
      return;
    }

    const newItem = {
      name: formData.item || null,
      select: formData.selectedOption || null,
      other_symptoms: formData.otherSymptoms || null,
      stool_type: formData.selectedStoolType || null,
      is_bleeding: formData.bloodInStool || false,
      user_id: userId,
    };

    postEntry(newItem).then((newEntry) => {
      setEntriesList((prevList) => [
        ...prevList,
        { ...newEntry, isEditing: false },
      ]);
      setFormData({
        item: '',
        selectedOption: '',
        otherSymptoms: '',
        selectedStoolType: '',
        bloodInStool: false,
      });
    });
  };

  const itemOptions = ['Food', 'Beverage', 'Medication', 'Supplement'];
  const stoolTypeOptions = [
    'Type 1',
    'Type 2',
    'Type 3',
    'Type 4',
    'Type 5',
    'Type 6',
    'Type 7',
  ];

  return (
    <Paper className="form-container" elevation={10}>
      <Box className="form-box" component="form" onSubmit={handleSubmit}>
        <TextField
          className="form-field"
          type="text"
          name="item"
          value={formData.item}
          onChange={handleChange}
          placeholder="What did you consume?"
          variant="outlined"
          margin="normal"
        />
        <FormControl className="form-field" variant="outlined" margin="normal">
          <InputLabel>Select an option</InputLabel>
          <Select
            name="selectedOption"
            value={formData.selectedOption}
            onChange={handleChange}
            label="Select an option"
          >
            {itemOptions.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          className="form-field"
          type="text"
          name="otherSymptoms"
          value={formData.otherSymptoms}
          onChange={handleChange}
          placeholder="What are your symptoms?"
          variant="outlined"
          margin="normal"
        />
        <FormControl className="form-field" variant="outlined" margin="normal">
          <InputLabel>Bristol Stool Scale</InputLabel>
          <Select
            name="selectedStoolType"
            value={formData.selectedStoolType}
            onChange={handleChange}
            label="Bristol Stool Scale"
          >
            {stoolTypeOptions.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {formData.selectedStoolType && (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.bloodInStool}
                  onChange={handleChange}
                  name="bloodInStool"
                />
              }
              label="Blood in Stool"
            />
          </FormGroup>
        )}
        <Button
          className="add-btn"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: { xs: '100%', sm: 'auto', md: 'auto' },
            py: '10px',
            px: '80px',
          }}
        >
          Add
        </Button>
      </Box>
    </Paper>
  );
}

export default EntriesForm;
