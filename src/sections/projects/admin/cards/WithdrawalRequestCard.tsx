// material-ui
import { Box, Button, Card, CardContent, Slider, Stack, Typography } from '@mui/material';

// ==============================|| PREVIEW CARD ||============================== //

type Props = {
  projectName?: string;
  imoNumber?: number;
  fundRaising?: number;
  offering?: number;
  requestAmount?: number;
  handleApprove?: () => void;
  handleReject?: () => void;
};

const WithdrawalRequestCard = (props: Props) => {
  return (
    <Card style={{ position: 'relative' }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between">
            <Box>
              <Typography color="text.secondary">Project</Typography>
              <Typography variant="h3">{props.projectName || 'Unknown'}</Typography>
            </Box>
            <Box>
              <Typography color="text.secondary">IMO Number</Typography>
              <Typography variant="h3">{props.imoNumber || 'Unknown'}</Typography>
            </Box>
          </Stack>
          <Typography variant="body2" pl={1} color="text.secondary">
            Fund Raising Status
          </Typography>
          <Box pr={4} pt={3} pl={1.5}>
            <Slider
              value={props.fundRaising}
              max={props.offering}
              min={0}
              disabled
              valueLabelDisplay="on"
              marks={[
                { value: 0, label: '0' },
                { value: props.offering || 100, label: `$${props.offering || 10000}` }
              ]}
            />
          </Box>
          <Stack direction="row" spacing={2}>
            <Button color="success" fullWidth variant="contained" disabled={!props.requestAmount}>
              Approve
            </Button>
            <Button color="error" fullWidth variant="contained" disabled={!props.requestAmount}>
              Reject
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WithdrawalRequestCard;
