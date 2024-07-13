import { useState, useEffect } from 'react';

const useAuthToken = () => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('jwtToken') || null;
  });

  const saveToken = (userToken) => {
    localStorage.setItem('jwtToken', userToken);
    setToken(userToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return {
    setToken: saveToken,
    token
  };
};

export default useAuthToken;
