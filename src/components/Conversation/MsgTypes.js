import { Box, Divider, IconButton, Link, Stack, Typography, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { DotsThreeVertical, DownloadSimple, Image } from 'phosphor-react';
import React from 'react';
import {Message_options} from '../../data'
import { useState } from 'react';
const base64ToBlob = (base64, type) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Uint8Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  return new Blob([byteNumbers], { type });
};

// Function to handle download
const handleDownload = (base64PDF) => {
  const blob = base64ToBlob(base64PDF, 'application/pdf');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'document.pdf'; // Specify the download file name
  a.click();
  URL.revokeObjectURL(url); // Clean up the URL object
};
const DocMsg = ({el,menu}) => {
    const theme = useTheme();
    // const formattedText = el.message.split('\n').map((line, index) => (
    //   <React.Fragment key={index}>
    //     {line}
       
    //   </React.Fragment>
    // ));
    const formatText = (text) => {
      // Split text into lines
      const lines = text.split('\n').filter(line => line.trim() !== '');
  
      return lines.map((line, index) => {
        // Add logic to identify headings and lists if needed
        if (line.startsWith('Project Name') || line.startsWith('Document Title') || line.startsWith('Version')) {
          return <h3 key={index}>{line}</h3>; // Heading style for important information
        } else if (line.startsWith('•')) {
          return <li key={index}>{line.substring(1).trim()}</li>; // List item
        } else {
          return <p key={index}>{line}</p>; // Regular paragraph
        }
      });
    };
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
        <Stack spacing={2}>
            <Stack p={2} spacing={3} direction='row' alignItems='center' 
            sx={{backgroundColor:theme.palette.background.paper, borderRadius:1}}>
                <Image size={48}/>
                <Typography variant='caption'>
                   {el?.title}
                </Typography>
                <IconButton onClick={()=>{handleDownload(el.file)}}>
                    <DownloadSimple/>
                </IconButton>
            </Stack>
            <Typography variant='body2' sx={{color: el.incoming ? theme.palette.text : '#fff' }} >
             
            {formatText(el.message)}
            </Typography>
        </Stack>
        </Box>
        {menu && <MessageOptions/>}
        
    </Stack>
  )
}
const Base64PDFViewer = ({ base64Data }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const pdfSrc = `data:application/pdf;base64,${base64Data}`;
  
    const toggleViewer = () => {
      setIsOpen(!isOpen);
    };
  
    return (
      <div>
        <button onClick={toggleViewer} style={{ marginBottom: '10px' }}>
          {isOpen ? 'Close PDF' : 'Open PDF'}
        </button>
  
        <div style={{ position: 'relative' }}>
          <iframe
            title="PDF Viewer"
            src={pdfSrc}
            width={isOpen ? '100%' : '300px'} // Small frame when closed
            height={isOpen ? '800px' : '200px'} // Small height when closed
            style={{ border: 'none', transition: 'all 0.3s ease' }}
          />
        </div>
      </div>
    );
  };

const LinkMsg = ({el,menu}) => {
    const theme = useTheme();
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
        <Stack spacing={2}>
            <Stack p={2} spacing={3} alignItems='start'
             sx={{backgroundColor:theme.palette.background.paper, borderRadius: 1}}>
                <img src={el.preview} alt={el.message} style={{maxHeight:210, borderRadius:'10px'}}/>
                <Stack spacing={2}>
                    <Typography variant='subtitle2'>Creating Chat App</Typography>
                    <Typography variant='subtitle2' sx={{color:theme.palette.primary.main}} 
                    component={Link} to="//https://www.youtube.com">www.youtube.com</Typography>
                </Stack>
                <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                    {el.message}
                </Typography>
            </Stack>
        </Stack>
        </Box>
        {menu && <MessageOptions/>}
    </Stack>
  )
}

const ReplyMsg = ({el, menu}) => {
    const theme = useTheme();
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
        <Stack spacing={2}>
            <Stack p={2} direction='column' spacing={3} alignItems='center'
            sx={{backgroundColor:theme.palette.background.paper, borderRadius:1}}>
                <Typography variant='body2' color={theme.palette.text}>
                    {el.message}
                </Typography>    
            </Stack>
            <Typography variant='body2' color={ el.incoming ? theme.palette.text : '#fff'}>
                {el.reply}
            </Typography>
        </Stack>
        </Box>
        {menu && <MessageOptions/>}
    </Stack>
  )
}

const MediaMsg = ({el,menu}) => {
    const theme = useTheme();
  return (
    <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
        <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
                <Stack spacing={1}>
                    <img src={el.img} alt={el.message} style={{maxHeight: 210 , borderRadius:'10px'}}/>
                    <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                        {el.message}
                    </Typography>
                </Stack>
            </Box>
            {menu && <MessageOptions/>}
    </Stack>
  )
}

const TextMsg = ({el,menu}) => {
    const theme = useTheme();
    return (
        <Stack direction='row' justifyContent={el.incoming ? 'start' : 'end'}>
            <Box p={1.5} sx={{
                backgroundColor: el.incoming ? theme.palette.background.default :
                    theme.palette.primary.main, borderRadius: 1.5, width: 'max-content'
            }}>
                <Typography variant='body2' color={el.incoming ? theme.palette.text : '#fff'}>
                    {el.message}
                </Typography>
            </Box>
            {menu && <MessageOptions/>}
        </Stack>
    )
}

const TimeLine = ({ el }) => {
    const theme = useTheme();
    return <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Divider width='46%' />
        <Typography variant='caption' sx={{ color: theme.palette.text }}>
            {el.text}
        </Typography>
        <Divider width='46%' />
    </Stack>
}

const MessageOptions = () => {
    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
    <DotsThreeVertical 
    id="basic-button"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
    size={20}
    />

    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <Stack spacing={1} px={1}>
        {Message_options.map((el)=>(
            <MenuItem onClick={handleClick}>{el.title}</MenuItem>
        ))}
      </Stack>
      </Menu>
    </>
  )
}


// should not be default export, because we need to export multiple things
export { TimeLine, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg,Base64PDFViewer }