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

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#228CD3',
          '&:hover': {
            backgroundColor: '#1e2ebf',
          },
        },
      },
    },
  },

  typography: {
    fontFamily: 'Ariel, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
  },
});

export default theme;
