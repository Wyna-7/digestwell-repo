import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#e2f6fe',
      main: '#228CD3',
      dark: '#1e2ebf',
    },
    secondary: {
      light: '#def4f2',
      main: '#1ebfaf',
      dark: '#00836d',
    },
    background: {
      default: '#F7F9F9',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

export default theme;
