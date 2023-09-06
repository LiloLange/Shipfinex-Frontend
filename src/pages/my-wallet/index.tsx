import { ReactElement, SyntheticEvent, useState } from 'react';

// material-ui
import { Grid, IconButton, Paper, Stack, Tab, Tabs, Theme, Typography, useMediaQuery } from '@mui/material';

// third-party
import { useSession } from 'next-auth/react';

// project import
import Layout from 'layout';
import Page from 'components/Page';
import InvestorBalanceCard from 'sections/dashboard/investor/FinancialCard';
import InvestorTransferCard from 'sections/my-wallet/investor/TransferCard';
import InvestorTransactionHistory from 'sections/my-wallet/investor/TransactionHistory';
import ProjectOwnerBalanceCard from 'sections/my-wallet/project-owner/BalanceCard';
import ProjectOwnerProjectBalanceCard from 'sections/my-wallet/project-owner/ProjectBalanceCard';
import ProjectOwnerTransactionHistory from 'sections/my-wallet/project-owner/TransactionHistory';

// types
import { UserRole } from 'types/auth';

// assets
import { DownloadOutlined } from '@ant-design/icons';

// ==============================|| My Wallet ||============================== //

const MyWallet = () => {
  const { data: session } = useSession();
  const [tab, setTab] = useState<number>(0);
  const matchDownSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const handleTabChange = (ev: SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Page title="My Wallet">
      {session?.token.role === UserRole.INVESTOR && (
        <Stack spacing={3}>
          <Grid container justifyContent="stretch" alignItems="stretch" spacing={2}>
            <Grid item xs={6}>
              <InvestorBalanceCard />
            </Grid>
            <Grid item xs={6}>
              <InvestorTransferCard walletAddress={session.token.walletAddress} />
            </Grid>
          </Grid>
          <Stack
            direction={matchDownSM ? 'column' : 'row'}
            justifyContent="space-between"
            alignItems={matchDownSM ? 'start' : 'end'}
            spacing={2}
          >
            <Typography variant="h4">Transaction History</Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Paper>
                <Tabs value={tab} onChange={handleTabChange}>
                  <Tab label="All" value={0} />
                  <Tab label="MRN" value={1} />
                  <Tab label="MAT" value={2} />
                </Tabs>
              </Paper>
              <Paper>
                <IconButton>
                  <DownloadOutlined style={{ color: 'blue' }} />
                </IconButton>
              </Paper>
            </Stack>
          </Stack>
          <InvestorTransactionHistory />
        </Stack>
      )}
      {session?.token.role === UserRole.PROJECT_OWNER && (
        <Stack spacing={3}>
          <Grid container justifyContent="stretch" spacing={3}>
            <Grid item xs={12} sm={6}>
              <ProjectOwnerBalanceCard walletAddress={session.token.walletAddress} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <ProjectOwnerProjectBalanceCard />
            </Grid>
          </Grid>
          <Typography variant="h4">Transaction History</Typography>
          <ProjectOwnerTransactionHistory />
        </Stack>
      )}
    </Page>
  );
};

MyWallet.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MyWallet;
