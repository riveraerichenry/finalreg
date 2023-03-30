import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { Grid } from '@mui/material';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }} style={{minHeight: "100vh"}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trial
          </Typography>
          <Link href='register-new'>
            <Button color="inherit">Register</Button>
          </Link>
          <Link href='login'>
            <Button color="inherit">Login</Button>
          </Link> 
        </Toolbar>
      </AppBar>
      <Grid justifyContent="center" alignContent="center" margin={8}>
            <Grid item>
              <Typography variant='h1'>
                Exercise 1. Part I & II
              </Typography>
            </Grid>
      </Grid>
    </Box>
  );
}
