import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Container, Flex } from '@chakra-ui/react';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import apiClient from '../../api/apiClient';
import User from '../../api/dtos/user.dto';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';
import AdminTable from '../../components/researcherLandingPage/AdminTable';

const ResearcherLandingPage: React.FC = () => {
  const { isLoading, error, data } = useQuery<User[], Error>('adminList', () =>
    apiClient.getAdmins(),
  );
  const navigate = useNavigate();

  const onClick = () => navigate('/researcher/add-new-admin');

  return (
    <Container maxW="7xl" mt={12}>
      <Flex>
        <Box>
          <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={onClick}>
            Add Admin
          </Button>
        </Box>
      </Flex>
      {data && <AdminTable data={data} />}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
    </Container>
  );
};

export default ResearcherLandingPage;
