import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

// material-ui
import { Box, InputAdornment, Stack, TextField, Typography } from '@mui/material';

// assets
import { SendOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| CHAT ROW  ||============================== //

type ChatRowProps = {
  message: string[];
  isSender: boolean;
  timeStamp?: Date;
};

const ChatRow = ({ message, isSender, timeStamp }: ChatRowProps) => {
  return (
    <Stack direction="row" justifyContent={isSender ? 'end' : 'start'} spacing={2} alignItems="center">
      {isSender && (
        <Typography color="text.secondary" alignSelf="end">
          {timeStamp?.toLocaleTimeString().slice(0, -3)}
        </Typography>
      )}
      <Stack direction="row" maxWidth={350} spacing={1} alignItems="center">
        {!isSender && (
          <Box
            width={32}
            height={32}
            bgcolor="#ccc"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            borderRadius={8}
          >
            {!isSender && <UserOutlined />}
          </Box>
        )}
        <Box
          borderRadius={4}
          bgcolor={!isSender ? '#ccc' : 'purple'}
          style={{ wordBreak: 'break-all' }}
          px={2}
          py={1}
          color={!isSender ? 'black' : 'white'}
        >
          {message.map((msg, index) => (
            <Typography key={`${msg}-${index}`}>{msg}</Typography>
          ))}
        </Box>
      </Stack>
      {!isSender && (
        <Typography color="text.secondary" alignSelf="end">
          {timeStamp?.toLocaleTimeString().slice(0, -3)}
        </Typography>
      )}
    </Stack>
  );
};

// ==============================|| CHAT BOARD  ||============================== //

const ChatBoard = () => {
  const [newMessage, setNewMessage] = useState<string>('');
  const chatsRef = useRef<HTMLDivElement>(null);

  const handleNewMessageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(ev.target.value);
  };

  const [rows, setRows] = useState<ChatRowProps[]>([
    {
      message: ['Hello'],
      isSender: false,
      timeStamp: new Date()
    }
  ]);

  useEffect(() => {
    chatsRef.current?.scrollTo({ top: chatsRef.current.scrollHeight });
  }, [rows]);

  const handleKeyDown = (ev: KeyboardEvent<HTMLInputElement>) => {
    if (ev.key == 'Enter' && !ev.shiftKey) {
      if (newMessage.replaceAll(' ', '').length > 0 && chatsRef) {
        setRows([...rows, { message: newMessage.split('\n'), isSender: true, timeStamp: new Date() }]);
        setNewMessage('');
      }
      ev.preventDefault();
    }
  };

  return (
    <Stack height="100%" spacing={2}>
      <Stack flexGrow={1} spacing={2} overflow="auto" ref={chatsRef} pr={1}>
        {rows.map((chat, index) => (
          <ChatRow message={chat.message} isSender={chat.isSender} timeStamp={chat.timeStamp} key={`chat-row-${index}`} />
        ))}
      </Stack>
      <TextField
        placeholder="Enter message"
        value={newMessage}
        onChange={handleNewMessageChange}
        multiline
        onKeyDown={handleKeyDown}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" style={{ alignSelf: 'end', marginBottom: 10 }}>
              <SendOutlined style={{ fontSize: 24 }} />
            </InputAdornment>
          )
        }}
      />
    </Stack>
  );
};

export default ChatBoard;
