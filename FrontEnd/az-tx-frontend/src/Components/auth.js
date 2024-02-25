import React, { useState } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from 'axios';

const Auth = () => {

  const { user, isAuthenticated } = useAuth0();

  const baseUrl = 'http://localhost:5001'

  const saveUserDetails = async (userDetails) => {
    try {
      const response = await fetch(`${baseUrl}/user/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
  
      if (response.ok) {
        console.log('User details saved successfully');
      } else {
        console.error('Error saving user details');
      }
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  if (!isAuthenticated) return <div>Loading...</div>;

  const auth0UserDetails = {
    id: user.sub,
    email: user.email,
  }
  console.log(auth0UserDetails)
  
  saveUserDetails(auth0UserDetails)

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};


export default Auth;