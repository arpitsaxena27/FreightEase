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
  ThemeProvider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

// Create a dark theme
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

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Add login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main, // Blue color
      textDecoration: 'underline',
    },
  }));
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ marginTop: '4rem' }}>
        <Card>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
              <Grid container spacing={2}>
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
                Log In
              </Button>
            </Box>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Typography variant="body2">
                Don't have an account? <StyledLink to="/register">Sign Up</StyledLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </ThemeProvider>
  );
};

export default LoginPage;
