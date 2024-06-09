import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const HealthImpactTable = ({ entriesList }) => {
  const beneficialItems = entriesList.filter((item) => {
    if (item.health_impact === 'Beneficial') {
      return true;
    }
    return false;
  });

  console.log(beneficialItems);

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align='right'>Item</TableCell>
            <TableCell align='right'>Health Impact</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {beneficialItems.map((entry, index) => (
            <TableRow key={index}>
              <TableCell component='th' scope='row'>
                {index + 1}
              </TableCell>
              <TableCell align='right'>{entry.name}</TableCell>
              <TableCell align='right'>{entry.health_impact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HealthImpactTable;
