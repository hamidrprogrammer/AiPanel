import React from 'react';
import { useMsal } from '@azure/msal-react';

const LoginButton = () => {
    const { instance } = useMsal();

    const handleLogin = async () => {
        try {
            await instance.loginPopup({
                scopes: ["User.Read"], // Specify the scopes you need
            });
            console.log("Login successful");
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <button onClick={handleLogin}>
            Login with Microsoft
        </button>
    );
};

export default LoginButton;
