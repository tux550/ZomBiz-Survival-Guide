import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { SignUpPost } from '../connections/Auth';

function SignupForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    SignUpPost(data.get('name'), data.get('email'), data.get('password'));
  };

  return (
    <div>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email"
          name="email"
          autoComplete="email"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/login" variant="body2">
              {'Already have an account? Sign In'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default SignupForm;
