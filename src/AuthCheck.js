import React from 'react';
import { useMsal } from '@azure/msal-react';
import LoginButton from './LoginButton'; // Import the LoginButton component
import { Button, Modal, Typography } from '@mui/material';
import MicrosoftLogin from 'react-microsoft-login';
import Router from './routes';
import myImage from './alfa-laval2206.jpg'; // Adjust the path to your image file
import { useNavigate } from 'react-router-dom';

const msalConfig = {
    auth: {
      clientId: "356fe2ef-4e6c-4719-bfa5-1b2996c41fcd",
          authority:"https://login.microsoftonline.com/d9f018ac-3fe4-43ee-b3ff-fdafdec35d3f",
          postLogoutRedirectUri: "/",
          navigateToLoginRequestUrl: false,
      redirectUri: 'http://localhost:3000', // Your redirect URI
    },
  };
const AuthCheck = () => {
    const { accounts } = useMsal();
    const navigate = useNavigate();
    const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect()
      .catch(error => {
        console.error(error);
      });
  };


    // Check if the user is authenticated
    const isLoggedIn = accounts.length > 0;

    return (
        <div style={{position:"absolute",width:`100%`,height:`100%`,backgroundColor:"#fff"}}>
            {isLoggedIn ? (
               <Router />
            ) : (
                <div>
                    <Modal
        open={true}
        onClose={()=>{}}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
       <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        borderRadius: '30px',
        width: '400px',
        height:500,
        textAlign: 'center',
        alignItems:'center',
        
        justifyItems:'center',
        paddingTop:30
      }}>
        <div style={{width:`100%`,height:100,alignItems:"center",
             display: 'flex', justifyContent:"center"
        }}>
              <img src={myImage} alt="Description of the image" 
              style={{width:150,height:150,alignSelf:"center"}}/>
              </div>
              <Typography id="modal-title" variant="h4">
              Alfa Laval
        </Typography>
        <div style={{width:`100%`,height:10,
        }}></div>
        <Typography id="modal-title" variant="h6">
          Welcome
        </Typography>
        <div style={{width:`100%`,height:10,
        }}></div>
        <Typography id="modal-description" sx={{ mt: 2 }}>
          Please sign in to continue.
        </Typography>
        <div style={{width:`100%`,height:10,
        }}></div>
         <Button
      variant={'contained'}
      color={'primary'}
      onClick={handleLogin}
      sx={{
        minWidth: 120, // Minimum width
        borderRadius: 8, // Standard border radius
        padding: '8px 16px', // Padding for the button
        fontWeight: 'bold', // Font weight
        transition: 'background-color 0.3s', // Transition for hover effect
        '&:hover': {
          backgroundColor:  '#1976d2', // Custom hover effect
        },
      }}
    >
      {"Sign in with Microsoft"}
    </Button>
      </div>
      </Modal>
                </div>
            )}
         
        </div>
    );
};

export default AuthCheck;
