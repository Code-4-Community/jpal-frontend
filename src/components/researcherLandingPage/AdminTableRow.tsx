import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
import User from '../../api/dtos/user.dto';
import dateFormatter from '../utils/dateFormat';

export interface AdminTableRowProps {
  admin: User;
}

const AdminTableRow: React.FC<AdminTableRowProps> = ({ admin }) => (
  <Tr>
    <Td>{`${admin.firstName} ${admin.lastName}`}</Td>
    <Td>{admin.email}</Td>
    <Td>{dateFormatter(admin.creation_date)}</Td>
  </Tr>
);

export default AdminTableRow;
