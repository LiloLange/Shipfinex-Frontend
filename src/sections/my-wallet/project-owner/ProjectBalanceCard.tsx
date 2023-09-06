// material-ui
import { Button, Card, Stack, Typography } from '@mui/material';

// assets
import * as antColors from '@ant-design/colors';

// ==============================|| BALANCE CARD - MY WALLET - INVESTOR ||============================== //

type BalanceData = {
  balance?: number;
  handleSend?: () => {};
};

const ProjectBalanceCard = (props: BalanceData) => {
  return (
    <Card
      style={{
        backgroundColor: antColors.blue[8],
        color: 'white',
        height: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingTop: 20
      }}
    >
      <Stack justifyContent="space-between" height="100%">
        <Stack spacing={1}>
          <Typography>Project Balance</Typography>
          <Typography variant="h2" fontWeight={800}>
            $ {props.balance?.toLocaleString() || 0}
          </Typography>
        </Stack>
        <Button variant="outlined" style={{ width: 300 }} color="inherit">
          Send
        </Button>
      </Stack>
    </Card>
  );
};

export default ProjectBalanceCard;
