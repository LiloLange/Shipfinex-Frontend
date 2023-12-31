import { useCallback, useEffect, useState } from 'react';

// material-ui
import { Box, Card, CircularProgress, Divider, IconButton, Stack, Tooltip, Typography } from '@mui/material';

// assets
import * as antColors from '@ant-design/colors';
import { SyncOutlined } from '@ant-design/icons';

// ==============================|| BALANCE CARD - MY WALLET - INVESTOR ||============================== //

type BalanceData = {
  balance?: number;
  handleSend?: () => {};
};

const ProjectBalanceCard = (props: BalanceData) => {
  const [total, setTotal] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);

  const refreshData = useCallback(() => {
    setLoading(true);
    fetch('/api/investment').then(async (res) => {
      if (res.status === 200) {
        const { total } = await res.json();
        setTotal(total);
        setLoading(false);
      }
    });
  }, []);

  const handleRefresh = useCallback(() => {
    refreshData();
  }, [refreshData]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <Card
      style={{
        background: `linear-gradient(135deg, ${antColors.green[4]} 30%, ${antColors.green[6]})`,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        height: '100%'
      }}
    >
      <Stack direction="row" mb={1} justifyContent="space-between" alignItems="center">
        <Box color="white">
          <Typography variant="body2">Total raised</Typography>
          <Typography variant="h4">$ {total.fundraising}</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box color="white">
          <Typography variant="body2">Revenue & Rewards Given</Typography>
          <Typography variant="h4">$ {total.rewards}</Typography>
        </Box>
        <Box>
          <Tooltip title="Refresh">
            {!isLoading ? (
              <IconButton style={{ borderRadius: '100px', color: 'white' }} onClick={handleRefresh}>
                <SyncOutlined />
              </IconButton>
            ) : (
              <IconButton style={{ borderRadius: '100px', color: 'white' }}>
                <CircularProgress size={18} color="inherit" />
              </IconButton>
            )}
          </Tooltip>
        </Box>
      </Stack>
    </Card>
  );
};

export default ProjectBalanceCard;
