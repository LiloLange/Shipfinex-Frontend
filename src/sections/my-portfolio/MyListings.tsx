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
  { id: 'projectName', label: 'Project Name', minWidth: 20, align: 'left' },
  { id: 'invested', label: 'Invested', minWidth: 15, align: 'center' },
  { id: 'valueNow', label: 'Value Now', minWidth: 15, align: 'center' },
  { id: 'dividend', label: 'Dividend', minWidth: 15, align: 'center' },
  { id: 'rewards', label: 'Revenue & Rewards', minWidth: 20, align: 'center' },
  { id: 'action', label: 'Action', minWidth: 15, align: 'center' }
];

const rows: any[] = [];

// ==============================|| PORTFOLIIO TRANSACTIONS TABLE ||============================== //

export default function MyListings() {
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
                <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={`my-listings-${column.id}`} align={column.align}>
                        {column.id === 'rewards' && <Typography color="success">{value}</Typography>}
                        {column.id === 'projectName' && (
                          <Stack direction="row" spacing={1}>
                            <Image src="" alt="" />
                            <Typography>123</Typography>
                            <Typography color="textSecondary">234</Typography>
                          </Stack>
                        )}
                        {column.id === 'action' && (
                          <NextLink href={value} passHref legacyBehavior>
                            <Link>
                              <Button>Polygonscan</Button>
                            </Link>
                          </NextLink>
                        )}
                        {column.id !== 'rewards' &&
                          column.id !== 'projectName' &&
                          column.id !== 'action' &&
                          (column.format ? column.format(value) : value)}
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
