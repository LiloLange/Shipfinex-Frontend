import { ChangeEvent, useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';

// material-ui
import {
  Link,
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
  useTheme,
  SelectChangeEvent,
  TextField,
  InputAdornment
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { EyeOutlined, InboxOutlined, SearchOutlined } from '@ant-design/icons';

// types
import { KeyedObject } from 'types/root';

// table columns
interface ColumnProps {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right' | 'left' | 'inherit' | 'center' | 'justify' | undefined;
  format?: (value: Date | number) => string | boolean;
}

const columns: ColumnProps[] = [
  { id: 'id', label: 'S.No.', minWidth: 5, align: 'left' },
  { id: 'projectName', label: 'Project Name', minWidth: 10, align: 'center' },
  { id: 'projectOwner', label: 'Project Owner', minWidth: 10, align: 'center' },
  { id: 'email', label: 'Email', minWidth: 10, align: 'center' },
  { id: 'vesselType', label: 'Project Category', minWidth: 10, align: 'center' },
  { id: 'tokenization', label: 'Tokenization', minWidth: 10, align: 'center' },
  { id: 'status', label: 'Status', minWidth: 5, align: 'center' },
  { id: 'createdAt', label: 'Created At', minWidth: 10, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 15, align: 'center' },
  { id: 'withdrawalRequest', label: 'Withdrawal Request', minWidth: 15, align: 'right' }
];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

const ProjectsAdminSection = () => {
  const [filter, setFilterChange] = useState<number>(3);
  const [search, setSearch] = useState<string>('');
  const headRowRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);
  const [rows, setRows] = useState<any[]>([]);

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
  }, []);

  const handleFilterChange = (event: SelectChangeEvent) => {
    setFilterChange(Number(event.target.value));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} justifyContent="end">
        <TextField
          value={search}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined style={{ color: 'white' }} />
              </InputAdornment>
            )
          }}
        />
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
            {rows &&
              rows.map((row: KeyedObject, _index) => (
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`${row.projectName}-${_index}`}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'id' && currentPage * 25 + _index - 24}
                        {column.id === 'email' && <Link href={`mailto:${row.projectOwner.email}`}>{row.projectOwner.email}</Link>}
                        {column.id === 'projectOwner' && `${row.projectOwner.firstName} ${row.projectOwner.lastName}`}
                        {column.id === 'tokenization' && (
                          <Typography color={!value ? theme.palette.error.main : theme.palette.success.main}>
                            {value ? 'Tokenized' : 'Not Tokenized'}
                          </Typography>
                        )}
                        {column.id === 'status' && (
                          <Typography
                            color={
                              value === 0 ? theme.palette.warning.main : value == 1 ? theme.palette.error.main : theme.palette.success.main
                            }
                          >
                            {value === 0 ? 'Pending' : value == 1 ? 'Rejected' : 'Approved'}
                          </Typography>
                        )}
                        {column.id === 'action' && (
                          <NextLink href={`/admin/projects/${row._id}`} passHref legacyBehavior>
                            <Link>
                              <IconButton size="medium">
                                <EyeOutlined style={{ color: 'white' }} />
                              </IconButton>
                            </Link>
                          </NextLink>
                        )}
                        {column.id !== 'projectOwner' &&
                          column.id !== 'email' &&
                          column.id !== 'status' &&
                          column.id !== 'action' &&
                          column.id !== 'tokenization' &&
                          column.id !== 'withdrawalRequest' &&
                          value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* table pagination */}
      {rows && rows.length === 0 ? (
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

export default ProjectsAdminSection;
