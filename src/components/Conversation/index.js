import { Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import Footer from './Footer';
import Message from './Message';

const Conversation = () => {
  const theme = useTheme();
  const [loadData, setLoadData] = useState(false);
  const [listChat, setLisChat] = useState([
    {
      type: "msg",
      message: "Hi 👋🏻, How are ya ?",
      incoming: true,
      outgoing: false,
      file:"",
    }


  ]);
  const handleTranslate = async (inputCode) => {
    setLoadData(true)
    try {
      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "prompt": "I want know about Project 8347 Alfa Laval – CCH-32"
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

      const response = await fetch('http://127.0.0.1:8000/api/prompt', requestOptions);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log( data?.response?.file?.base64_data);
      setLisChat((prevCode) => [...prevCode, {
        type: "msg",
        message: data?.response?.content,
        incoming: true,
        outgoing: false,
        subtype: "doc",
        file: data?.response?.file?.base64_data,
      }])


    } catch (error) {
      console.error('Error fetching data:', error);
    }

    setLoadData(false)


  };
  // --
  return (
    <Stack height={'100%'} maxHeight={'100vh'} width={'auto'}>

      {/* Chat header */}
      <Header />
      {/* Msg */}
      <Box className='scrollbar' width={"100%"} sx={{ flexGrow: 1, height: '100%', overflowY: 'scroll' }}>
        <Message menu={false} list={listChat} />
      </Box>
      {/* Chat footer */}
      <Footer onPress={(text) => {

        setLisChat((prevCode) => [...prevCode, {
          type: "msg",
          message: text,
          incoming: false,
          outgoing: true,
        }])
        handleTranslate(text)
      }} loading={loadData} />
    </Stack>
  )
}

export default Conversation