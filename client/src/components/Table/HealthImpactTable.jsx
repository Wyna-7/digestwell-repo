import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';

const HealthImpactTable = ({ entriesList }) => {
  const beneficialItems = entriesList.filter((item) =>
    item.health_impact === 'Beneficial' ? true : false
  );

  const neutralItems = entriesList.filter((item) =>
    item.health_impact === 'Neutral' ? true : false
  );

  const avoidItems = entriesList.filter((item) =>
    item.health_impact === 'Avoid' ? true : false
  );

  console.log(beneficialItems);

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
        p: 10,
      }}
    >
      <Box
        display='flex'
        justifyContent='space-around'
        width='100%'
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={{ xs: 2, sm: 4 }}
      >
        <Box sx={{ flex: '1 1 30%', minWidth: '300px', mx: 2, mb: 4 }}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
              fontSize: '20px',
              letterSpacing: '2px',
              textAlign: 'center',
              mb: '0.625rem',
            }}
          >
            Positive Health Impact
          </Typography>
          <TableContainer component={Paper} elevation={10}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow sx={{ bgcolor: 'secondary.light' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Item
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Health Impact
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {beneficialItems.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {index + 1}
                    </TableCell>
                    <TableCell align='center'>{entry.name}</TableCell>
                    <TableCell align='center'>{entry.health_impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ flex: '1 1 30%', minWidth: '300px', mx: 2, mb: 4 }}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
              fontSize: '20px',
              letterSpacing: '2px',
              textAlign: 'center',
              mb: '0.625rem',
            }}
          >
            Neutral Health Impact
          </Typography>
          <TableContainer component={Paper} elevation={10}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow sx={{ bgcolor: 'secondary.light' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Item
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Health Impact
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {neutralItems.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {index + 1}
                    </TableCell>
                    <TableCell align='center'>{entry.name}</TableCell>
                    <TableCell align='center'>{entry.health_impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ flex: '1 1 30%', minWidth: '300px', mx: 2, mb: 4 }}>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'medium',
              fontSize: '20px',
              letterSpacing: '2px',
              textAlign: 'center',
              mb: '0.625rem',
            }}
          >
            Negative Health Impact
          </Typography>
          <TableContainer component={Paper} elevation={10}>
            <Table aria-label='simple table'>
              <TableHead>
                <TableRow sx={{ bgcolor: 'secondary.light' }}>
                  <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Item
                  </TableCell>
                  <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                    Health Impact
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {avoidItems.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell component='th' scope='row'>
                      {index + 1}
                    </TableCell>
                    <TableCell align='center'>{entry.name}</TableCell>
                    <TableCell align='center'>{entry.health_impact}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Container>
  );
};

export default HealthImpactTable;
