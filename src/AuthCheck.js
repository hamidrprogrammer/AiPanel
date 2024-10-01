import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { Button, Modal, Typography } from '@mui/material';
import Router from './routes';
import myImage from './alfa-laval2206.jpg'; // Adjust the path to your image file
import { useNavigate } from 'react-router-dom';

const AuthCheck = () => {
    const { accounts, instance } = useMsal();
    const navigate = useNavigate();
    const [isLoggingIn, setIsLoggingIn] = useState(false); // State to manage login status

    const handleLogin = () => {
        if (isLoggingIn) return; // Prevent multiple login attempts
        setIsLoggingIn(true); // Set logging in state

        instance.loginPopup()
            .then(() => {
                // Handle successful login
                navigate('/'); // Navigate to the desired route after successful login
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoggingIn(false); // Reset logging in state after the attempt
            });
    };

    // Check if the user is authenticated
    const isLoggedIn = accounts.length > 0;

    return (
        <div style={{ position: "absolute", width: `100%`, height: `100%`, backgroundColor: "#fff" }}>
            {isLoggedIn ? (
                <Router />
            ) : (
                <div>
                    <Modal
                        open={true}
                        onClose={() => {}}
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
                            height: 500,
                            textAlign: 'center',
                        }}>
                            <div style={{
                                width: `100%`, height: 100,
                                display: 'flex', justifyContent: "center"
                            }}>
                                <img src={myImage} alt="Description of the image"
                                    style={{ width: 150, height: 150, alignSelf: "center" }} />
                            </div>
                            <Typography id="modal-title" variant="h4">
                                Alfa Laval
                            </Typography>
                            <div style={{ width: `100%`, height: 10 }}></div>
                            <Typography id="modal-title" variant="h6">
                                Welcome
                            </Typography>
                            <div style={{ width: `100%`, height: 10 }}></div>
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                Please sign in to continue.
                            </Typography>
                            <div style={{ width: `100%`, height: 10 }}></div>
                            <Button
                                variant={'contained'}
                                color={'primary'}
                                onClick={handleLogin}
                                disabled={isLoggingIn} // Disable button while logging in
                                sx={{
                                    minWidth: 120, // Minimum width
                                    borderRadius: 8, // Standard border radius
                                    padding: '8px 16px', // Padding for the button
                                    fontWeight: 'bold', // Font weight
                                    transition: 'background-color 0.3s', // Transition for hover effect
                                    '&:hover': {
                                        backgroundColor: '#1976d2', // Custom hover effect
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
