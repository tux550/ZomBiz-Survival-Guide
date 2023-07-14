import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import { SignUpPost } from '../connections/Api';
import './RegisterForm.css';

function RegisterForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    SignUpPost(data.get('email'), data.get('password'));
  };

  return (
    <div className="register-form-container">
      <div className="form-wrapper">
        <h2 className="register-title">Regístrate</h2>
        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                {"¿Ya tienes una cuenta? Iniciar sesión"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default RegisterForm;
