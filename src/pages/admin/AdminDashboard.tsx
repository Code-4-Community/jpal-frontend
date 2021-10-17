import {Spinner, Table, Tbody, Td, Th, Thead, Tr} from '@chakra-ui/react';
import * as React from 'react';
import {useQuery} from 'react-query';
import apiClient from '../../api/apiClient';
import User from '../../api/dtos/user.dto';

const AdminDashboard: React.FC = () => {
  const { isLoading, error, data } = useQuery<User[], Error>('helloWorld', () =>
    apiClient.getAdmins(),
  );

  const getTableRows = (): React.ReactNode => (
      <>
        {data && data.map((admin) => (
          <Tr>
            <Td>
              Placeholder name
            </Td>
            <Td>{admin.email}</Td>
            <Td>Placeholder date</Td>
          </Tr>
        ))}
      </>
)

  return (
    <>
      {data && (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Admin</Th>
              <Th>Email</Th>
              <Th>Date Added</Th>
            </Tr>
          </Thead>
          <Tbody>{getTableRows()}</Tbody>
        </Table>
      )}
      {isLoading && (<Spinner/>)}
      {error && (<p>error loading</p>)}
    </>
  );
};

export default AdminDashboard;
