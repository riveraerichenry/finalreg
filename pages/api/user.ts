import { NextApiRequest, NextApiResponse } from 'next';

interface RegisterRequestBody {
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  emailAddress: string;
  mobileNumber: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userName, firstName, middleName, lastName, emailAddress, mobileNumber, password } = req.body as RegisterRequestBody;
    console.log('Registration data:', { userName, firstName, middleName, lastName, emailAddress, mobileNumber, password });
    // Save the registration data to the database or perform any other necessary operations
    res.status(200).json({ message: 'Registration successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};