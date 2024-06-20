import EntriesForm from '../components/EntriesForm/EntriesForm';
import EntriesList from '../components/EntriesList/EntriesList';

import { Container, Box } from '../../node_modules/@mui/material/index';

export default function Dashboard() {

  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='100vh'
        padding={2}
      >
        <EntriesForm />
        <EntriesList />
      </Box>
    </Container>
  );
}