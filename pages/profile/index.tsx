import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Login from '../login';

function IndexPage() {
  const router = useRouter();
  const userObj = Cookies.get('user');
  const user = userObj ? JSON.parse(userObj) : null;


  if(user) {
      useEffect(() => {
    router.push(`/profile/${user.id}`);
  }, []);

  return null;
  }
  else {
    Cookies.set('prof', JSON.stringify(user), { expires: 1, path: '/' });
      useEffect(() => {
    router.push('/login');
  }, []);

  return null;
    
};
  }


export default IndexPage;