import { ReactElement } from 'react';

// material-ui
import { Box, Chip, List, ListItem, Stack, Typography } from '@mui/material';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import ChatBoard from 'sections/help/ChatBoard';
import MainCard from 'components/MainCard';

// third-party
import { useSession } from 'next-auth/react';

// ==============================|| Help ||============================== //

const Help = () => {
  // const theme = useTheme();
  const { data: session } = useSession();

  return (
    <Page title="Help">
      <Stack direction="row" width="100%">
        <Box bgcolor="white" border="1px solid #E6EBF1" borderRadius={1} width={350}>
          <Typography px={2} py={2.5} borderBottom="1px solid #E6EBF1">
            {session?.token.email}
          </Typography>
          <List style={{ padding: 0, overflow: 'auto', height: 'calc(100vh - 240px)' }}>
            {Array.from(new Array(15)).map((_, index) => (
              <ListItem
                key={`chat-user-${index}`}
                style={{ width: '100%', borderBottom: '1px solid #E6EBF1', borderLeft: '4px solid purple' }}
              >
                <Stack direction="row" spacing={2} alignItems="stretch" width="100%">
                  <Box
                    style={{
                      background: 'url(https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg)',
                      width: 60,
                      height: 60,
                      borderRadius: 100,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <Box style={{ position: 'relative' }} flexGrow={1}>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography>{session?.token.email.slice(0, 15)}...</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date().toLocaleTimeString().slice(0, -3)}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      lastmessage
                    </Typography>
                    <Chip label="1" color="info" style={{ position: 'absolute', right: 0, bottom: 0 }} />
                  </Box>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>
        <MainCard title={session?.token.email} style={{ flexGrow: 1 }}>
          <Box style={{ height: 'calc(100vh - 280px)' }}>
            <ChatBoard />
          </Box>
        </MainCard>
      </Stack>
    </Page>
  );
};

Help.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Help;
