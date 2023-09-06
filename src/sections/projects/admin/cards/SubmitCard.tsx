import { ChangeEvent, useState } from 'react';

// material-ui
import {
  Button,
  CardContent,
  Divider,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  useTheme
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// ==============================|| PREVIEW CARD ||============================== //

type Log = {
  action: string;
  date: Date;
};

type Props = {
  projectStatus?: number;
  projectName?: string;
  handleSubmit: (status: number, comment: string) => void;
  logs?: Log[];
};

const SubmitCard = (props: Props) => {
  const [newStatus, setNewStatus] = useState<number>(props.projectStatus || 0);
  const [comments, setComments] = useState<string>();

  const theme = useTheme();

  const handleStatusChange = (ev: SelectChangeEvent) => {
    setNewStatus(Number(ev.target.value));
  };

  const handleCommentsChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setComments(ev.currentTarget.value);
  };

  const handleSubmit = () => {
    props.handleSubmit(newStatus, comments || '');
  };

  return (
    <MainCard>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4">Project Status</Typography>
        <Typography
          variant="h4"
          color={
            props.projectStatus === 2
              ? theme.palette.success.main
              : props.projectStatus === 1
              ? theme.palette.error.main
              : theme.palette.warning.main
          }
        >
          {props.projectStatus === 2 ? 'Approved' : props.projectStatus === 1 ? 'Rejected' : 'Pending'}
        </Typography>
      </Stack>
      <Divider style={{ marginTop: 16 }} />
      <CardContent>
        <Stack spacing={1.5}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary" width={200}>
              Project Name
            </Typography>
            <Typography variant="body2" fontWeight={700}>
              {props.projectName}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body2" color="text.secondary" width={200}>
              Status
            </Typography>
            <Select
              fullWidth
              value={newStatus.toString()}
              onChange={handleStatusChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Project Owner Statistics Filter' }}
            >
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={2}>Approved</MenuItem>
              <MenuItem value={1}>Rejected</MenuItem>
            </Select>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <InputLabel>Activity Log</InputLabel>
            <List
              sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                minHeight: 100,
                maxHeight: 200,
                border: '1px solid #D9D9D9FF',
                borderRadius: '4px',
                '& ul': { padding: 0 }
              }}
            >
              {props.logs &&
                props.logs.map((log, index) => (
                  <ListItem key={`activity-log-${index}`}>
                    <Stack direction="row" justifyContent="space-between">
                      <ListItemText>{log.action}</ListItemText>
                      <ListItemText>{log.date.toLocaleDateString()}</ListItemText>
                    </Stack>
                  </ListItem>
                ))}
            </List>
          </Stack>
          <TextField value={comments} placeholder="Add Comments" onChange={handleCommentsChange} multiline />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </CardContent>
    </MainCard>
  );
};

export default SubmitCard;
