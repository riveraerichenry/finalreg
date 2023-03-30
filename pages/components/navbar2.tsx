import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Remove any user data from localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('token');

    // Redirect to the login page
    router.push('/login');
  }, []);

  return null;
}





export default function Navbar() {
    const user = localStorage.getItem('user');
    const userObj = JSON.parse('user');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trial
          </Typography>
          {user && (
          <Typography variant="body1" style={{ marginLeft: 'auto' }}>
            Hello, {userObj.firstName} {userObj.middleName} {userObj.lastName} 
          </Typography>
        )}
          <Link href='../dashboard'>
            <Button color="inherit">Home</Button>
          </Link>
          <Link href='../profile'>
            <Button color="inherit">Profile</Button>
          </Link> 
          <Link href='../Contacts'>
            <Button color="inherit">Contacts</Button>
          </Link> 
        </Toolbar>
      </AppBar>
    </Box>
  );
}
