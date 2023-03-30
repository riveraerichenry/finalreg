import axios from 'axios';
import { useState, useEffect } from 'react';

function MyComponent() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('/api/user')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    console.log(userData)
  );
}

export default MyComponent