import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import EntriesContext from '../context/EntriesContext';

export default function Register() {
  const { setUserId } = React.useContext(EntriesContext);

  const navigate = useNavigate();

  async function handleSubmit (event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await login(data.get('email'), data.get('password'));
    const resData = await res.json();
    if (res.status === 200) {
      setUserId(resData.userId);
      return navigate('/dashboard');
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
          <Avatar
            sx={{ m: 1, bgcolor: 'secondary.main', width: 120, height: 120 }}
          >
            <Avatar
              alt='Mr Beast'
              src='/profile-picture.png'
              sx={{ width: 120, height: 120 }}
            />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
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
              autoComplete='current-password'
            />
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href='#' variant='body2' to={'/my-lists'}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
