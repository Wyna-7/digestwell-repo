import React from 'react';
import Entry from '../Entry/Entry';
import { Container, Box, Paper } from '@mui/material';
import './style.css';

const EntriesList = ({ entriesList, setEntriesList }) => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: 'none',
        width: '100%',
        height: '400px',
        overflowY: 'auto',
        bgcolor: '#F3F6F6',
        borderRadius: 10,
        mt: 10,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 1200,
          p: 10,
        }}
      >
        <Box
          component="ul"
          sx={{
            listStyleType: 'none',
            padding: 0,
            margin: 0,
            paddingBottom: '20px',
          }}
        >
          {entriesList.map((entry) => {
            return (
              <Box component="li" key={entry.id}>
                <Entry {...entry} setEntriesList={setEntriesList} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Container>
  );
};

export default EntriesList;
