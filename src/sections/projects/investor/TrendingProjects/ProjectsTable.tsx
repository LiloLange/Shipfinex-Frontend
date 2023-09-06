import { useEffect, useRef, useState } from 'react';

// next
import NextLink from 'next/link';
import Image from 'next/image';

// material-ui
import {
  Box,
  Link,
  Button,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

// projects
import usePagination from 'hooks/usePagination';

// assets
import { InboxOutlined } from '@ant-design/icons';

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
  { id: 'projectName', label: 'Project Name', minWidth: 17, align: 'left' },
  { id: 'numberOfTokens', label: '# of Tokens', minWidth: 16, align: 'left' },
  { id: 'currentValue', label: 'Current value', minWidth: 16, align: 'left' },
  { id: 'expectedEarning', label: 'Expected earning', minWidth: 17, align: 'left' },
  { id: 'minInvestment', label: 'Min investment', minWidth: 17, align: 'left' },
  { id: 'action', label: '', minWidth: 17, align: 'left' }
];

const rows: any[] = [{}];

// ==============================|| PROJECTS TABLE ||============================== //

export default function ProjectsTable() {
  const headRowRef = useRef<HTMLDivElement>(null);
  const [totalRows, setTotalRows] = useState<number>(0);
  const { currentPage, jump } = usePagination(100, 25);

  useEffect(() => {
    setTotalRows(100);
  }, []);

  return (
    <Box>
      {rows.length > 0 && (
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
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={`trending-projects-table-row-${_index}`}>
                  {columns.map((column, index) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`trending-projects-table-${index}`} align={column.align}>
                        {column.id === 'expectedEarning' && `${value}%`}
                        {column.id === 'projectName' && (
                          <Stack direction="row" spacing={1}>
                            <Image src="" alt="" />
                            <Typography>{value}</Typography>
                          </Stack>
                        )}
                        {column.id === 'numberOfTokens' && `${Number(value).toLocaleString()}MT`}
                        {column.id === 'currentValue' && `$${Number(value).toLocaleString()}`}
                        {column.id === 'minInvestment' && `${Number(value).toLocaleString()} $USD`}
                        {column.id === 'action' && (
                          <NextLink href={value || '/'} passHref legacyBehavior>
                            <Link>
                              <Button variant="contained">Buy now</Button>
                            </Link>
                          </NextLink>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
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
    </Box>
  );
}
