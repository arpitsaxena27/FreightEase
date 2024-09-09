import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Create a dark theme for the sign-up page
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

// Styled Link component
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    color: theme.palette.primary.main, // Blue color
    textDecoration: 'underline',
  },
}));

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    // Add sign-up logic here
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSignup} noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
              >
                Sign Up
              </Button>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Already have an account?{' '}
                <StyledLink to="/login">Log in</StyledLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default SignupPage;
