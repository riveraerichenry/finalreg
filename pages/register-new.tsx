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


// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }


interface FormValues {
  firstName: string;
  lastName: string;
  middleName: string;
  emailAddress: string;
  mobileNumber: string;
  userName: string;
  password: string;
  cPassword: string;

}




const validationSchema = Yup.object({
  userName: Yup.string().required('Username is required').min(4,'Username should not be less than 5 characters')
                          .max(10,'Username should not exceed 15 characters'),
  firstName: Yup.string().required('First name is required'),
  middleName: Yup.string(),
  lastName: Yup.string().required('Last name is Required'),
  emailAddress: Yup.string().required('Email address is required').email('Email must be valid'),
  mobileNumber: Yup.string().required('Mobile number is required').matches(/^(0)\d{10}$/, 'Mobile number should start from 0 and 11 digit maximum'),
  password: Yup.string().required('Password is required').min(6,'Password should be atleast 6 characters').max(15,'Password should not exceed 15 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 'Password should contain at least 1 uppercase, 1 lowercase, 1 special character and 1 number'),
  cPassword: Yup.string().oneOf([Yup.ref('password'), ], 'Password do not match').required('Confirm Password is Required')
});

const theme = createTheme();




export default function Register() {

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      userName: '',
      firstName: '',
      middleName: '',
      lastName: '',
      emailAddress: '',
      mobileNumber: '',
      password: '',
      cPassword: '',

    },
    
  
    validationSchema: validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        try {
     
          const response = await axios.post('https://641d535cb556e431a880d7d5.mockapi.io/users', values);
        console.log(response.data);
        router.push("/login");
 
        
        }catch (error) {
          console.error(error);
        }
        finally {
          setSubmitting(false);
        }
        
      },
      
    });

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
            Register
          </Typography>
          <Box >
            <Grid container spacing={2} style={{ minHeight: "50vh"}}>
              <Grid item xs={12} sm={4}>
                  <TextField
                    autoComplete="Off"
                    name="userName"
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    error={formik.touched.userName && Boolean(formik.errors.userName)}
                    helperText={formik.touched.userName && formik.errors.userName}
                  />
                </Grid>
              <Grid item xs={12} sm={4}>
                  
                </Grid>
                
              <Grid item xs={12} sm={4}>
                
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField
                      variant='outlined'
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    id="middleName"
                    name="middleName"
                    label="Middle Name"
                    value={formik.values.middleName}
                    onChange={formik.handleChange}
                    error={formik.touched.middleName && Boolean(formik.errors.middleName)}
                    helperText={formik.touched.middleName && formik.errors.middleName}
                />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    id="emailAddress"
                    name="emailAddress"
                    label="Email Address"
                    value={formik.values.emailAddress}
                    onChange={formik.handleChange}
                    error={formik.touched.emailAddress && Boolean(formik.errors.emailAddress)}
                    helperText={formik.touched.emailAddress && formik.errors.emailAddress}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    id="mobileNumber"
                    name="mobileNumber"
                    label="Mobile Number"
                    value={formik.values.mobileNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                    helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant='outlined'
                      fullWidth
                      type="password"
                      id="password"
                      name="password"
                      label="Password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={formik.touched.password && Boolean(formik.errors.password)}
                      helperText={formik.touched.password && formik.errors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant='outlined'
                      fullWidth
                      type="password"
                      id="cPassword"
                      name="cPassword"
                      label="Confirm Password"
                      value={formik.values.cPassword}
                      onChange={formik.handleChange}
                      error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
                      helperText={formik.touched.cPassword && formik.errors.cPassword}
                  />
                </Grid>
             
            </Grid>
            <br />
            <Button color="primary" variant="contained" fullWidth type="submit" endIcon={<ArrowForwardIosIcon/>} sx={{ mt: 3, mb: 2 }}>
                Submit
                </Button>
             
            <Grid container justifyContent="flex-end" spacing={5}>
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Login
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