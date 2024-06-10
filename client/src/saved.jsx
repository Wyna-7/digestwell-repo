function EntriesForm({ setEntriesList }) {
  const [item, setItem] = useState('');
  const [selectedOption, setSelectedOption] = useState('Food');
  const [otherSymptoms, setOtherSymptoms] = useState('');
  const [selectedStoolType, setSelectedStoolType] = useState('');
  const [bloodInStool, setBloodInStool] = useState(false);
  const [isInputVisible, setIsInputVisible] = useState(true);

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSymptoms = (event) => {
    setOtherSymptoms(event.target.value);
    console.log('symptoms:', event.target.value);
  };

  const handleStoolChange = (event) => {
    setSelectedStoolType(event.target.value);
    console.log('stool:', event.target.value);
  };

  const handleBloodPresenceChange = (event) => {
    setBloodInStool(event.target.checked);
    console.log('blood:', event.target.checked);
  };

  const handleFormChange = (event) => {
    setIsInputVisible(!isInputVisible);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      name: item,
      select: selectedOption,
      other_symptoms: otherSymptoms,
      stool_type: selectedStoolType,
      is_bleeding: bloodInStool,
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
      setBloodInStool(false);
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
        width='100%'
        maxWidth={1200}
      >
        <Paper elevation={10} sx={{ p: 2, pb: 3.2, width: '100%' }}>
          <Box
            component='form'
            onSubmit={handleSubmit}
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            {isInputVisible ? (
              <>
                <TextField
                  type='text'
                  name='item'
                  value={item}
                  onChange={handleChange}
                  placeholder='What did you consume?'
                  variant='outlined'
                  margin='normal'
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    mb: 2,
                  }}
                  required
                />
                <FormControl
                  variant='outlined'
                  margin='normal'
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    mb: 2,
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
              </>
            ) : (
              <>
                <TextField
                  type='text'
                  name='otherSymptoms'
                  value={otherSymptoms}
                  onChange={handleSymptoms}
                  placeholder='What are your symptoms?'
                  variant='outlined'
                  margin='normal'
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    mb: 2,
                  }}
                  required
                />
                <FormControl
                  variant='outlined'
                  margin='normal'
                  sx={{
                    width: '100%',
                    maxWidth: 500,
                    mb: 2,
                  }}
                >
                  <InputLabel>Bristol Stool Scale</InputLabel>
                  <Select
                    value={selectedStoolType}
                    onChange={handleStoolChange}
                    label='Bristol Stool Scale'
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
                <Box>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label='Symptoms'
                      value={selectedStoolType}
                      onChange={handleFormChange}
                    />
                  </FormGroup>
                </Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={bloodInStool}
                        onChange={handleBloodPresenceChange}
                        label='Blood in Stool'
                      />
                    }
                    label='Blood in Stool'
                  />
                </FormGroup>
              </>
            )}

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
        </Paper>
      </Box>
    </Container>
  );
}

export default EntriesForm;
