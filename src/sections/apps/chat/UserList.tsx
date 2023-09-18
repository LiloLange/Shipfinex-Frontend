import { Fragment, useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, List, ListItemAvatar, ListItemButton, ListItemText, Stack, Typography } from '@mui/material';

// third-party
import { Chance } from 'chance';

// project imports
import UserAvatar from './UserAvatar';
import Dot from 'components/@extended/Dot';
import { useDispatch, useSelector } from 'store';
import { getUsers } from 'store/reducers/chat';

// assets
import { CheckOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
import { UserProfile } from 'types/user-profile';
import { useSession } from 'next-auth/react';

const chance = new Chance();

interface UserListProps {
  setUser: (u: UserProfile) => void;
  search?: string;
}

function UserList({ setUser, search }: UserListProps) {
  const theme = useTheme();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [data, setData] = useState<UserProfile[]>([]);
  const { users } = useSelector((state) => state.chat);

  useEffect(() => {
    if (session?.token.role !== 2) dispatch(getUsers());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setData(users);
  }, [users]);

  useEffect(() => {
    if (search) {
      const results = users.filter((row: KeyedObject) => {
        let matches = true;

        const properties: string[] = ['name'];
        let containsQuery = false;

        properties.forEach((property) => {
          if (row[property].toString().toLowerCase().includes(search.toString().toLowerCase())) {
            containsQuery = true;
          }
        });

        if (!containsQuery) {
          matches = false;
        }
        return matches;
      });

      setData(results);
    } else {
      setData(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <List component="nav">
      {data.map((user) => (
        <Fragment key={user.email}>
          <ListItemButton
            sx={{ pl: 1 }}
            onClick={() => {
              setUser(user);
            }}
          >
            <ListItemAvatar>
              <UserAvatar user={user} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Stack component="span" direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                  <Typography
                    variant="h5"
                    color="inherit"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {user['email']}
                  </Typography>
                  <Typography component="span" color="textSecondary" variant="caption">
                    {user.lastMessage}
                  </Typography>
                </Stack>
              }
              secondary={
                <Typography
                  variant="caption"
                  color="textSecondary"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  {user.status}
                  {user.unReadChatCount ? (
                    <Dot color="primary" />
                  ) : (
                    // chance.bool() - use for last send msg was read or unread
                    <CheckOutlined style={{ color: chance.bool() ? theme.palette.grey[400] : theme.palette.primary.main }} />
                  )}
                </Typography>
              }
            />
          </ListItemButton>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
}

export default UserList;
