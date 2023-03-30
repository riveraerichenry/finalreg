import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';
import Cookies from 'js-cookie';

// interface FormValues {
// userName: string;
// password: string;
// }

interface User {
id: string;
userName: string;
password: string;
accountEnabled: boolean;
}

const validationSchema = Yup.object({
userName: Yup.string().required('Username is required'),
password: Yup.string().required('Password is required')
});

const theme = createTheme();

export default function Login() {
const [errorMessage, setErrorMessage] = useState('');
const [failedAttempts, setFailedAttempts] = useState(0);
const [accountLocked, setAccountLocked] = useState(false);

const router = useRouter();
const formik = useFormik({
initialValues: {
userName: '',
password: '',
},
validationSchema: validationSchema,
onSubmit: async (values) => {
const { data } = await axios.get('https://641d535cb556e431a880d7d5.mockapi.io/users');
const user = data.find((u: User) => u.userName === values.userName && u.password === values.password);

const profile = Cookies.get('prof');


        if (user && !accountLocked) {
          if(!profile) {
                setFailedAttempts(0);
              Cookies.set('user', JSON.stringify(user), { expires: 1, path: '/' });
              router.push('/dashboard');
          }else {
            Cookies.set('user', JSON.stringify(user), { expires: 1, path: '/' });
            Cookies.remove('prof');
            router.push(`/profile/${user.id}`);
          }
        } else {
        setFailedAttempts(failedAttempts + 1);
        if (failedAttempts === 2) {
          let username = values.userName;
          const expire = new Date(Date.now() + 30 * 60 * 1000);
          Cookies.set('temp', JSON.stringify(username), {expires: expire, path: '/'});
          setAccountLocked(true);

          setTimeout(() => {
                setAccountLocked(false);
                setFailedAttempts(0);
              }, 30 * 60 * 1000);
  
   
        }
setErrorMessage('Invalid Username or password'); 
}
},
});

const { data: users } = useSWR('https://641d535cb556e431a880d7d5.mockapi.io/users', axios);


  if(!users) {
    return <div>Loading ...</div>
  } 

  return (
    <form onSubmit={formik.handleSubmit}>
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
            Login
          </Typography>
          <Box >
          <Grid container spacing={2} >
            <Grid item xs={12}>
                <TextField
                  autoComplete="Off"
                  name="userName"
                  required
                  fullWidth
                  id="userName"
                  label="Username"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  error={
                    (formik.touched.userName && Boolean(formik.errors.userName)) ||
                    Boolean(errorMessage)
                  }
                  helperText={
                    (formik.touched.userName && formik.errors.userName) 
                  }
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                autoComplete="Off"
                name="password"
                required
                fullWidth
                id="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  (formik.touched.password && Boolean(formik.errors.password)) ||
                  Boolean(errorMessage)
                }
                helperText={
                  (formik.touched.password && formik.errors.password) ||
                  errorMessage
                }
              />
            </Grid>
          </Grid>
            <br />
            <Button color="primary" variant="contained" fullWidth type="submit" endIcon={<ArrowForwardIosIcon/>} sx={{ mt: 3, mb: 2 }}>
                Submit
                </Button>
                {accountLocked && (
              <Typography color="error" variant="body1">
                Account locked. Please try again in 30 minutes.
              </Typography>
            )}
             
            <Grid container justifyContent="flex-end" spacing={5}>
              <Grid item>
                <Link href="register-new" variant="body2">
                  Add Account
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
        
      </Container>
    </ThemeProvider>
    </form>
  );
}