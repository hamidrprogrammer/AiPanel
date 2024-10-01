import { Link, Stack, Typography } from '@mui/material'
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AuthSocial from '../../sections/auth/AuthSocial';
import LoginForm from '../../sections/auth/LoginForm';
import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';


const Login = () => {
  const { instance, accounts } = useMsal();

  const login = () => {
      instance.loginPopup({
          scopes: ['User.Read'],
      }).then(response => {
          console.log('Login response:', response);
      }).catch(error => {
          console.error('Login error:', error);
      });
  };

  const logout = () => {
      instance.logoutPopup().then(() => {
          console.log('Logged out');
      }).catch(error => {
          console.error('Logout error:', error);
      });
  };

  return (
      <div>
          <h1>Microsoft Authentication</h1>
          {accounts.length > 0 ? (
              <div>
                  <h2>Welcome, {accounts[0].name}</h2>
                  <button onClick={logout}>Logout</button>
              </div>
          ) : (
              <button onClick={login}>Login with Microsoft</button>
          )}
      </div>
  );
};

export default Login