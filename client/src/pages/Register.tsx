import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/authService';
import EntriesContext from '../context/EntriesContext';
import { useContext } from 'react';

export default function Register() {
  const { setUserId } = useContext(EntriesContext);
  
  const navigate = useNavigate();

  async function handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await register(data.get('email'), data.get('password'), data.get('firstName'), data.get('lastName'));
    const resData = await res.json();
    if (res.status === 201) {
      setUserId(resData.userId);
      navigate('/dashboard');
    } else {
      alert(resData.error);
    }
  }

  function Copyright(props) {
    return (
      <Typography
        variant='body2'
        color='text.secondary'
        align='center'
        {...props}
      >
        {'Copyright © '}
        <Link color='inherit' href='https://mui.com/'>
          Digest Well
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 40,
            letterSpacing: 6,
          }}
        >
          DigestWell
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component='h1' variant='h5'>
            Register
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='firstName'
              label='First Name'
              name='firstName'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='lastName'
              label='Last Name'
              name='lastName'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Register me
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
