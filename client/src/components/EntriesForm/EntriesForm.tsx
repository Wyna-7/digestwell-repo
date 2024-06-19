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
  SelectChangeEvent,
} from '../../../node_modules/@mui/material/index';

import { postEntry } from '../../services/apiService';
import './style.css';
import EntriesContext from '../../context/EntriesContext';
import * as React from 'react';
import { EntryFromDataBase, EntryToDataBase, EntryWithEdit } from '../../types';

function EntriesForm() {
  const { setEntriesList, userId } = useContext(EntriesContext);
  //TODO create data type in separate interface in types file, then import and use it here
  const [formData, setFormData] = useState<{
    item: string;
    selectedOption: string;
    otherSymptoms: string;
    selectedStoolType: string;
    bloodInStool: boolean;
  }>({
    item: '',
    selectedOption: '',
    otherSymptoms: '',
    selectedStoolType: '',
    bloodInStool: false,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string | EventTarget>,
  ) => {
    let { name, value } = event.target;

    if (name === 'bloodInStool') {
      value = event.target.value; //had to replace .checked with .value, not sure if it will work in the browser
    }

    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.item && !formData.otherSymptoms && !formData.selectedStoolType) {
      alert('Please fill either the item and select option or other symptoms and stool type.');
      return;
    }

    //TODO create newitem type in separate interface in types file, then import and use it here
    const newItem: EntryToDataBase = {
      name: formData.item,
      select: formData.selectedOption,
      other_symptoms: formData.otherSymptoms,
      stool_type: formData.selectedStoolType,
      is_bleeding: formData.bloodInStool,
      userId: userId,
      health_impact: 'Neutral',
    };

    //TODO create newentry type in separate interface in types file, then import and use it here
    postEntry(newItem).then((newEntry: EntryFromDataBase) => {
      const nextList = (prevList: EntryWithEdit[]): EntryWithEdit[] => [...prevList, { ...newEntry, isEditing: false }];
      setEntriesList(nextList);
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
  const stoolTypeOptions = ['Type 1', 'Type 2', 'Type 3', 'Type 4', 'Type 5', 'Type 6', 'Type 7'];

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
              control={<Checkbox value={formData.bloodInStool} onChange={handleChange} name="bloodInStool" />}
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
