// material-ui
import { Button, Stack, Typography } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import { CopyOutlined } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

// ==============================|| BALANCE CARD - MY WALLET - INVESTOR ||============================== //

type BalanceData = {
  totalMRN?: number;
  totalUSD?: number;
  walletAddress?: string;
  handleBuy?: () => {};
  handleSend?: () => {};
  handleReceive?: () => {};
};

const BalanceCard = (props: BalanceData) => {
  const handleCopyClipboard = () => {
    navigator.clipboard.writeText(props.walletAddress || 'no wallet');
  };

  return (
    <MainCard style={{ backgroundColor: antColors.blue[5], color: 'white' }}>
      <Stack spacing={1}>
        <Typography>Total Balance</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h2">$ {props.totalMRN?.toLocaleString() || 0}</Typography>
        </Stack>
        <Stack direction="column-reverse" spacing={2} alignItems="start">
          <Stack direction="row" spacing={1}>
            <Button variant="contained" style={{ backgroundColor: 'white', color: 'black', width: 200 }}>
              Buy
            </Button>
            <Button variant="outlined" style={{ width: 200 }} color="inherit">
              Send
            </Button>
          </Stack>
          <Button
            variant="contained"
            color="inherit"
            style={{ backgroundColor: '#ffffff20', height: 'max-content', borderRadius: 16 }}
            onClick={handleCopyClipboard}
          >
            <Typography mr={1}>{props.walletAddress}</Typography>
            <CopyOutlined />
          </Button>
        </Stack>
      </Stack>
    </MainCard>
  );
};

export default BalanceCard;
