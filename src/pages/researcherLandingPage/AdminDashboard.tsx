import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import User from '../../api/dtos/user.dto';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';

const AdminDashboard: React.FC = () => {
  const { isLoading, error, data } = useQuery<User[], Error>('adminList', () =>
    apiClient.getAdmins(),
  );
  const history = useHistory();

  const getTableRows = (): React.ReactNode => (
    <>
      {data &&
        data.map((admin) => (
          <Tr>
            <Td>Placeholder name</Td>
            <Td>{admin.email}</Td>
            <Td>Placeholder date</Td>
          </Tr>
        ))}
    </>
  );

  const onClick = (): void => {
    history.push('/private/add-new-admin');
  };

  return (
    <Container maxW="7xl" mt={12}>
      {data && (
        <>
          <Flex>
            <Box>
              <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onClick}>
                Add Admin
              </Button>
            </Box>
            <Spacer />
            <Box>
              <InputGroup>
                <InputLeftElement>
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                <Input width="200px" placeholder="Search..." />
              </InputGroup>
            </Box>
          </Flex>
          <Box mt={5} borderWidth={1} borderRadius="lg">
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
          </Box>
        </>
      )}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
    </Container>
  );
};

export default AdminDashboard;
