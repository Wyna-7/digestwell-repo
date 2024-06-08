import React from 'react';
import Entry from '../Entry/Entry';
import { Container, Box, Paper } from '@mui/material';
const EntriesList = ({ entriesList, setEntriesList }) => {
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
        sx={{
          border: '2px solid #F3F6F6',
          bgcolor: '#F3F6F6',
          borderRadius: 2,
          width: '100%',
          maxWidth: 1200,
          p: 10,
        }}
      >
        <Box
          component='ul'
          sx={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          {entriesList.map((entry) => (
            <Box component='li' key={entry.id}>
              <Entry {...entry} setEntriesList={setEntriesList} />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default EntriesList;
