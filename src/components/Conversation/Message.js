import { Box, Stack } from '@mui/material'
import React from 'react';
import { Chat_History } from '../../data'
import Base64Downloader from 'react-base64-downloader';

import { Base64PDFViewer, DocMsg, LinkMsg, MediaMsg, ReplyMsg, TextMsg, TimeLine } from './MsgTypes';
const Article = ({ content }) => {
  const formattedContent = content.split('### ').map((section, index) => {
    if (section.trim() === '') return null;

    const [title, ...body] = section.split('\n').filter(line => line.trim() !== '');

    return (
      <div key={index}>
        {title && (
          <h3>{title.replace(/^#+\s*/, '')}</h3>
        )}
        {body.map((paragraph, idx) => {
          if (paragraph.startsWith('####')) {
            return <h4 key={idx}>{paragraph.replace(/^#+\s*/, '')}</h4>;
          } else if (paragraph.startsWith('-')) {
            return (
              <ul key={idx}>
                <li>{paragraph.replace(/^- /, '')}</li>
              </ul>
            );
          } else {
            return <p key={idx}>{paragraph}</p>;
          }
        })}
      </div>
    );
  });

  return (
    <article>
      {formattedContent}
    </article>
  );
};
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
const Message = ({ menu, list }) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {list?.map((el) => {
          let objectURL=null;
          if(el?.file!=null){
            const blob = base64ToBlob(el?.file, 'application/pdf');
            objectURL = URL.createObjectURL(blob);
          }
          
          switch (el.type) {
            case 'divider':
              return <TimeLine el={el} />

            case 'msg':
              switch (el.subtype) {
                case 'img':
                  case 'doc':
                    return (
                      <>
                      <DocMsg el={el}/>
                        {/* <div
                          dangerouslySetInnerHTML={{ __html: el.message }} // Render the HTML content safely
                        />
                     
                       {objectURL?    <iframe
                title="PDF Viewer"
                src={objectURL}
                width="50%"
                height="300px"
            />:null} */}
                 

                    
                      </>
                    );
                 
                 

                case 'link':
                  return <LinkMsg el={el} menu={menu} />
                case 'reply':
                  return <ReplyMsg el={el} menu={menu} />

                default:
                  return <TextMsg el={el} menu={menu} />
              }
              break;

            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  )
}

export default Message