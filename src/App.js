import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import Router from "./routes";
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import AuthCheck from './AuthCheck'; // The AuthCheck component
import LoginButton from './LoginButton'; // The LoginButton component
import { PublicClientApplication } from '@azure/msal-browser';
// MSAL configuration
const msalConfig = {
  auth: {
    clientId: "356fe2ef-4e6c-4719-bfa5-1b2996c41fcd",
        authority:"https://login.microsoftonline.com/d9f018ac-3fe4-43ee-b3ff-fdafdec35d3f",
        postLogoutRedirectUri: "/",
        navigateToLoginRequestUrl: false,
    redirectUri: 'http://95.216.205.162:3000', // Your redirect URI
  },
};

const msalInstance = new PublicClientApplication(msalConfig);
const App = () => {
    return (
        <MsalProvider instance={msalInstance}>
            <ThemeProvider>
                <ThemeSettings>
           
                    
                    
                    <AuthCheck />
                </ThemeSettings>
            </ThemeProvider>
        </MsalProvider>
    );
};

export default App;
