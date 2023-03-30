import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';
import LogoutButton from './logout';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useEffect } from 'react';



const theme = createTheme();




export default function Home() {
  const userObj = Cookies.get('user');
  const user = userObj ? JSON.parse(userObj) : null;
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    const channel = new BroadcastChannel('logout');
    channel.onmessage = () => {
      Cookies.remove('user');
      setIsLoggedOut(true);
      router.push('login')
    };
    return () => channel.close();
  }, []);

  if(!user || isLoggedOut) {
    return (
    
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Contact
            </Typography>
              
            <Grid margin={2} spacing={5} style={{ minHeight:"50vh"}} marginTop={10}>
                  <Grid item xs={12} justifyContent="center">
                      
                        <Typography color="secondary" variant="h4" style={{ marginLeft: 'auto' }}>
                        You are not logged in
                        </Typography>
                        
                  </Grid>
                 
            </Grid>
              <Grid margin={2} spacing={5}>
                
                <Link margin={4} href="/dashboard">
                  <Button variant="contained" color="primary">
                    Home
                  </Button>
                </Link>
                <Link margin={4} href="/profile">
                  <Button variant="contained" color="primary">
                    Profile
                  </Button>
                </Link>
                <Link margin={4} href="/login">
                  <Button variant="contained" color="secondary">
                    Login
                  </Button>
                </Link>
                <Link margin={4} href="/register-new">
                  <Button variant="contained" color="secondary">
                    Register
                  </Button>
                </Link>
              </Grid>
              
          </Box>
          
          
        </Container>
      </ThemeProvider>
     
    );
  } else {
    return (
    
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Contact
            </Typography>
              
            <Grid margin={2} spacing={5} style={{ minHeight:"50vh"}} marginTop={10}>
                  <Grid item xs={12} justifyContent="center">
                      {user && (
                        <Typography variant="h4" style={{ marginLeft: 'auto' }}>
                          {user.firstName}'s Contact Details
                        </Typography>
                            )}
                  </Grid>
                
                  <Grid item xs={12} marginTop={8}>
                      {user && (
                    <Typography variant="h4" color='secondary' style={{ marginLeft: 'auto' }}>
                      Email Address : {user.emailAddress}
                    </Typography>
                    
                        )}
                  </Grid>     
                  <Grid item xs={12} marginTop={8}>
                      {user && (
                    <Typography variant="h4" color='secondary' style={{ marginLeft: 'auto' }}>
                      Mobile Number : {user.mobileNumber}
                    </Typography>
                    
                        )}
                  </Grid>     
            </Grid>
              <Grid margin={2} spacing={5}>
                
                <Link margin={4} href="/dashboard">
                  <Button variant="contained" color="primary">
                    Home
                  </Button>
                </Link>
                <Link margin={4} href="/profile">
                  <Button variant="contained" color="primary">
                    Profile
                  </Button>
                </Link>
                <LogoutButton />
              </Grid>
              
          </Box>
          
          
        </Container>
      </ThemeProvider>
     
    );
  }

 
}




