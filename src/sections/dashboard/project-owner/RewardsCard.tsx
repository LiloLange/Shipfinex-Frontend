// material-ui
import { Box, Card, Divider, Stack, Typography } from '@mui/material';

// assets
import { FileDoneOutlined, CaretUpFilled } from '@ant-design/icons';
import * as antColors from '@ant-design/colors';

// ==============================|| REWARDS/REVENUE CARD ||============================== //

const RewardsCard = () => {
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
          <Typography variant="body2">Total Raised</Typography>
          <Typography variant="h4">0</Typography>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box color="white">
          <Typography variant="body2">Revenue & Rewards Given</Typography>
          <Typography variant="h4">0</Typography>
        </Box>
      </Stack>
      <Divider />
      <Stack borderRadius={2} color="white" direction="row" justifyContent="space-between" alignItems="center" py={1} mt={2}>
        <Box color="white">
          <Typography variant="body2">Month Overview</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h4">0</Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={0.5}
              bgcolor={antColors.blue[6]}
              border={1}
              borderColor="white"
              borderRadius={30}
              px={0.5}
              py={0.3}
              height="max-content"
            >
              <Typography variant="body2">0%</Typography>
              <CaretUpFilled />
            </Stack>
          </Stack>
        </Box>
        <FileDoneOutlined style={{ fontSize: 24 }} />
      </Stack>
    </Card>
  );
};

export default RewardsCard;
