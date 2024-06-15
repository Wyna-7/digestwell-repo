import { Box, Typography } from '@mui/material';

export default function SymptomsEntry({
  stool_type,
  is_bleeding,
  other_symptoms,
}) {
  //TODO Make this entry type editable, like the ConsumedItemEntry
  return (
    <>
      <Box display={'flex'}>
        {stool_type && (
          <Box display={'flex'}>
            <Typography variant='body1' fontWeight={'bold'} noWrap>
              Stool Type:
            </Typography>
            <Box ml={2}>{stool_type}</Box>
          </Box>
        )}
        {is_bleeding && (
          <Box display={'flex'}>
            <Typography variant='body1' fontWeight={'bold'} ml={5} noWrap>
              Bleeding:
            </Typography>
            <Box ml={2}> {is_bleeding ? 'Yes' : 'No'}</Box>
          </Box>
        )}
        {other_symptoms && (
          <Box display={'flex'}>
            <Typography variant='body1' fontWeight={'bold'} noWrap>
              Symptoms:
            </Typography>
            <Box ml={2}>{other_symptoms}</Box>
          </Box>
        )}
      </Box>
    </>
  );
}
