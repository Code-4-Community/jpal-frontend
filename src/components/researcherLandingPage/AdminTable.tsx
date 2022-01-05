import React from 'react';
import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import User from '../../api/dtos/user.dto';
import AdminTableRow from './AdminTableRow';

interface AdminTableProps {
  data: User[];
}

const AdminTable: React.FC<AdminTableProps> = ({ data }) => (
  <Box mt={5} borderWidth={1} borderRadius="lg">
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Admin</Th>
          <Th>Email</Th>
          <Th>Date Added</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((admin) => (
          <AdminTableRow admin={admin} />
        ))}
      </Tbody>
    </Table>
  </Box>
);
export default AdminTable;
