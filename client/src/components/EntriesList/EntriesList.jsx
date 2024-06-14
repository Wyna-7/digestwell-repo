import React from 'react';
import Entry from '../Entry/Entry';
import { Container, Box } from '@mui/material';
import './style.css';

const EntriesList = ({ entriesList, setEntriesList }) => {
  return (
    <Container className="entriesList-container">
      <Box className="entriesList-box">
        <Box className="entriesList-ul" component="ul">
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
