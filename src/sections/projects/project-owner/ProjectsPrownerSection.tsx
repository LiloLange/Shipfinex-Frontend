import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// material-ui
import {
  Link,
  Button,
  MenuItem,
  IconButton,
  Pagination,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  SelectChangeEvent,
  useTheme
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { EyeOutlined, InboxOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';
import { useSession } from 'next-auth/react';

// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

const columns: ColumnProps[] = [
  { id: 'id', label: 'S.No.', minWidth: 7, align: 'left' },
  { id: 'projectName', label: 'Project Name', minWidth: 17, align: 'center' },
  { id: 'vesselType', label: 'Project Category', minWidth: 17, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 13, align: 'center' },
  { id: 'createdAt', label: 'Created At', minWidth: 17, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 12, align: 'center' },
  { id: 'withdrawalRequest', label: 'Withdrawal Request', minWidth: 17, align: 'right' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

const ProjectsPrownerSection = () => {
  const [filter, setFilterChange] = useState<number>(3);
  const headRowRef = useRef<HTMLDivElement>(null);
  const { data: session } = useSession();
  const router = useRouter();

  const theme = useTheme();

  const [totalRows, setTotalRows] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([]);

  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    fetch('/api/project')
      .then(async (res) => {
        const { total: totalRows, data: _rows } = await res.json();
        if (totalRows) {
          setTotalRows(totalRows);
          setRows(_rows);
        }
      })
      .catch((error) => console.log(error));
  }, [router, session]);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterChange(Number(event.target.value));
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="end">
        <Select
          style={{ width: 140 }}
          value={filter.toString()}
          onChange={handleFilterChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Project Owner Statistics Filter' }}
        >
          <MenuItem value={3}>All</MenuItem>
          <MenuItem value={0}>Approved</MenuItem>
          <MenuItem value={1}>Pending</MenuItem>
          <MenuItem value={2}>Rejected</MenuItem>
        </Select>
        <NextLink href="/projects/add" passHref legacyBehavior>
          <Link>
            <Button variant="contained">Add New Project</Button>
          </Link>
        </NextLink>
      </Stack>
      <TableContainer ref={headRowRef}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{
                    minWidth: ((headRowRef.current?.clientWidth || 1200) * column.minWidth) / 100 - 24,
                    position: 'sticky !important'
                  }}
                  key={column.id}
                  align={column.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: KeyedObject, _index) => (
              <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`${row.projectName}-${_index}`}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'id' && currentPage * 25 + _index - 24}
                      {column.id === 'status' && (
                        <Typography
                          color={
                            value === 0 ? theme.palette.warning.main : value == 2 ? theme.palette.error.main : theme.palette.success.main
                          }
                        >
                          {value === 0 ? 'Pending' : value == 2 ? 'Rejected' : 'Approved'}
                        </Typography>
                      )}
                      {column.id === 'action' && (
                        <NextLink href={`/projects/${row._id}`} passHref legacyBehavior>
                          <Link>
                            <IconButton size="medium">
                              <EyeOutlined />
                            </IconButton>
                          </Link>
                        </NextLink>
                      )}
                      {column.id !== 'status' && column.id !== 'action' && column.id !== 'withdrawalRequest' && value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* table pagination */}

      {rows.length === 0 ? (
        <Stack alignItems="center">
          <Stack spacing={1} my={3} style={{ opacity: 0.6 }}>
            <InboxOutlined color="textSecondary" style={{ fontSize: '300%', color: 'gray', fontWeight: 300 }} />
            <Typography color="textSecondary" align="center">
              No data
            </Typography>
          </Stack>
        </Stack>
      ) : (
        <Stack alignItems="end" mt={2}>
          <Pagination
            count={Math.ceil(totalRows / 25)}
            page={currentPage}
            onChange={(_, _page) => jump(_page)}
            variant="contained"
            color="primary"
            shape="circular"
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ProjectsPrownerSection;
