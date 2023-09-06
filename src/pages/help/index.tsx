import { ReactElement } from 'react';

// material-ui
import { Box } from '@mui/material';

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
      <MainCard title={session?.token.email}>
        <Box style={{ height: 'calc(100vh - 280px)' }}>
          <ChatBoard />
        </Box>
      </MainCard>
    </Page>
  );
};

Help.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Help;
