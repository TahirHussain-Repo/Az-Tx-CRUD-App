import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from 'axios';

const Auth = () => {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0(); 

  useEffect(() => {
    const sendUserDataToBackend = async () => {
      if (!isAuthenticated) return;

      try {
        const accessToken = await getAccessTokenSilently();
        console.log('Access Token: ', accessToken);
        const userData = {
          auth0_id: user.sub,
          email: user.email
        };
        console.log(userData);

        await axios.post('http://localhost:5001/api/user', userData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
      } catch (error) {
        console.error("Error sending data to backend:", error);
      }
    };

    sendUserDataToBackend();
  }, [isAuthenticated, getAccessTokenSilently, user]);

  if (!isAuthenticated) return <div>Loading...</div>;

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};


export default Auth;