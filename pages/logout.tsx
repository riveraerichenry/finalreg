import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Button } from '@mui/material';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user');
    const channel = new BroadcastChannel('logout');
    channel.postMessage('logout');
    router.push('/login');
  };

  return (
    <Button variant="contained" color="secondary" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;