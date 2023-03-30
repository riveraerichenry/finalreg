import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import axios from 'axios';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/system';
import Cookies from 'js-cookie';
import Navbar from './components/navbar';

interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Profile = () => {
  const userObj = Cookies.get('user');
  const user: User | null = userObj ? JSON.parse(userObj) : null;
  const router = useRouter();
  const { data } = useSWR<User[]>('https://641d535cb556e431a880d7d5.mockapi.io/users', fetcher);

  useEffect(() => {
    if (!data) {
      // redirect to login page if cookie does not exist
      router.push('/login');
    }
  }, [data, router]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Navbar />
      </Grid>
      <Grid item xs={12}>
        <Typography variant='h1'>
          Profile
        </Typography>
        {user && (
          <Typography variant="h2" style={{ marginLeft: 'auto' }}>
            Name: {user.firstName} {user.middleName} {user.lastName}
          </Typography>
        )}
      </Grid>
      <hr />
      <Grid item xs={12}>
        {user && (
          <Typography variant="h3" style={{ marginLeft: 'auto' }}> 
            Email Address: {user.emailAddress}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12}>
        {user && (
          <Typography variant="h3" style={{ marginLeft: 'auto' }}> 
            Mobile Number: {user.mobileNumber}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;