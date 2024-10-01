import { Avatar, Box, Typography,IconButton, Divider,Stack, } from '@mui/material'
import { CaretDown, MagnifyingGlass, Phone,VideoCamera } from 'phosphor-react'
import React, { useEffect } from 'react';
import { useTheme } from "@mui/material/styles";
import { faker } from '@faker-js/faker';
import StyledBadge from '../StyledBadge';
import { ToggleSidebar } from '../../redux/slices/app';
import { useDispatch } from 'react-redux';
import { useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { useState } from 'react';
const getGraphClient = (accessToken) => {
    return Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        },
    });
};
const Header = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { instance, accounts } = useMsal();
  const [profile, setProfile] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
      if (accounts.length > 0) {
          // Get access token
          instance
              .acquireTokenSilent({
                  scopes: ["User.Read"],
                  account: accounts[0],
              })
              .then((response) => {
                  // Use the token to fetch user data from Microsoft Graph
                  const graphClient = getGraphClient(response.accessToken);
                  graphClient.api('/me').get().then((user) => {
                      setProfile(user);
                  });
                  graphClient.api('/me/photo/$value')
                        .responseType('blob')
                        .get()
                        .then((photoBlob) => {
                            const url = URL.createObjectURL(photoBlob);
                            setProfilePicture(url);
                        });
              })
              .catch((error) => {
                  console.error(error);
              });
      }
  }, [instance, accounts]);
  return (
    <Box p={2} sx={{ width:'100%', backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper, boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
    <Stack alignItems={'center'} direction='row' justifyContent={'space-between'}
    sx={{width:'100%', height:'100%'}}>
        <Stack onClick={()=>{
            dispatch(ToggleSidebar());
        }} direction={'row'} spacing={2}>
            <Box>
                <StyledBadge  overlap="circular"
                anchorOrigin={{ // position
                    vertical: "bottom",
                    horizontal: "right",
                }}
                variant="dot">
                    <Avatar alt={faker.name.fullName()} src={profilePicture}/>
                </StyledBadge>
                
            </Box>
            <Stack spacing={0.2}>
                    <Typography variant='subtitle2'>
                        {profile?.displayName}
                    </Typography>
                    <Typography variant='caption'>
                        Online
                    </Typography>
                </Stack>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={3}>
            <IconButton>
                <VideoCamera/>
            </IconButton>
            <IconButton>
                <Phone/>
            </IconButton>
            <IconButton>
                <MagnifyingGlass/>
            </IconButton>
            <Divider orientation='vertical' flexItem/>
            <IconButton>
                <CaretDown/>
            </IconButton>
        </Stack>
    </Stack>
</Box>
  )
}

export default Header