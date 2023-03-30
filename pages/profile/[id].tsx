
import { GetServerSideProps } from 'next';
import useSWR from 'swr';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Login from '../login';
import { Container, CssBaseline, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import LogoutButton from '../logout';
import { useEffect } from 'react';

const theme = createTheme();


type User = {
  id: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  password: string;
  accountEnabled: boolean;

}





export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const fetcher = async (url: string): Promise<User> => {
    const res = await fetch(url);
    return res.json();
  };

  console.log(id);
  

  const { data, error } = useSWR<User>(`https://641d535cb556e431a880d7d5.mockapi.io/users/${id}`, fetcher);
  const userObj = Cookies.get('user');
  const user = userObj ? JSON.parse(userObj) : null;
  const userId = user ? user.id : null;



  console.log(userId + 'wrong')
  if(userId === id) {
    console.log('right') 
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
              Profile
            </Typography>
              
            <Grid margin={2} spacing={5} style={{ minHeight:"50vh"}} marginTop={10}>
                  <Grid item xs={12} justifyContent="center">
                  {user && (
                    <Typography variant="h4" color='secondary' style={{ marginLeft: 'auto' }}>
                      ID: {user.id}
                    </Typography>
                    
                    
                        )} 
                         
                  </Grid>
                
                  <Grid item xs={12} marginTop={8}>
                      {user && (
                    <Typography variant="h4" color='secondary' style={{ marginLeft: 'auto' }}>
                      Username: {user.userName}
                    </Typography>
                    
                        )}
                  </Grid> 
                  <Grid item xs={12} marginTop={8}>
                      {user && (
                    <Typography variant="h4" color='secondary' style={{ marginLeft: 'auto' }}>
                      Name: {user.firstName} {user.middleName} {user.lastName}
                    </Typography>
                    
                        )}
                  </Grid>     
            </Grid>
              <Grid margin={2} spacing={5}>
                
                <Link margin={4} href="../dashboard">
                  <Button variant="contained" color="primary">
                    Home
                  </Button>
                </Link>
                <Link margin={4} href={'../contacts'} >
                  <Button variant="contained" color="primary">
                    Contact
                  </Button>
                </Link>
                <LogoutButton />
              </Grid>
              
          </Box>
          
          
        </Container>
      </ThemeProvider>
     
    ); 
  }
  else {
    console.log('wrong') 
    return <Login />
  }

  if (error) return <div>Failed to load user</div>;
  if (!data) return <div>Loading...</div>;

  


  // const { data: user, error } = useSWR<User>(
  //   id ? `https://641d535cb556e431a880d7d5.mockapi.io/users/${id}` : null,
  //   (url) => axios.get(url).then((res) => res.data)
  // );

  // if (error) return <div>Error loading user.</div>;
  // if (!user) return <div>Loading user...</div>;

  // return (
  //   <div>
  //     <h1>{user.userName}'s Profile</h1>
  //     <p>ID: {user.id}</p>
  //     <p>Account Enabled: {user.accountEnabled ? 'Yes' : 'No'}</p>
  //   </div>
  // );
}

// export const getServerSideProps: GetServerSideProps = async (value) => {
//   const userCookie = Cookies.get('user');

//   // If the user cookie doesn't exist, redirect to login page
//   if (!userCookie) {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }

//   const user = JSON.parse(userCookie) as User;

//   // If the user ID in the dynamic route doesn't match the user's ID in the cookie, redirect to dashboard
//   if (value.params?.id !== user.id) {
//     return {
//       redirect: {
//         destination: '/dashboard',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };