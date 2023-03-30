import React from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import LogoutButton from '../logout';




function Navbar() {

  const userObj = Cookies.get('user');
  const user = userObj ? JSON.parse(userObj) : null;

  console.log(userObj)

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid spacing={10}>
        <Typography variant="h3" style={{ flexGrow: 1 }}>
          Exercise 1, Part 2
        </Typography>
        
        </Grid>
        <Grid>
            <Grid item spacing={5}>
                <Link href='../dashboard'>
                    <Button
                    color='inherit'
                    >
                        <Typography>
                                Home
                        </Typography>
                    </Button>
                </Link>
                <Link href='../contacts'>
                    <Button
                    color='inherit'
                    >
                        <Typography>
                                Contacts
                        </Typography>
                    </Button>
                </Link>
                <Link href='../profile'>
                    <Button
                    color='inherit'
                    >
                        <Typography>
                                Profile
                        </Typography>
                    </Button>
                </Link>
            </Grid>
            
        </Grid>
        
        {user && (
          <Typography variant="body1" style={{ marginLeft: 'auto' }}>
            Hello, {user.firstName} {user.middleName} {user.lastName} 
          </Typography>
        )}
        
        
        <LogoutButton />

      </Toolbar>
    </AppBar>
  );
}

export default Navbar



