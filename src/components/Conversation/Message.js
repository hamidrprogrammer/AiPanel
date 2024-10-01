import { Box, Stack } from '@mui/material'
import React from 'react';
import { Chat_History } from '../../data'
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
const Message = ({ menu, list }) => {
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {list?.map((el) => {
          switch (el.type) {
            case 'divider':
              return <TimeLine el={el} />

            case 'msg':
              switch (el.subtype) {
                case 'img':
                  case 'doc':
                    return (
                      <>
                        <div
                          dangerouslySetInnerHTML={{ __html: el.message }} // Render the HTML content safely
                        />
                     
                        <embed src={`data:application/pdf;base64,${el.file}`} />
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