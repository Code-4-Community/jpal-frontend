import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Container, Input, Spacer, InputGroup, InputLeftElement } from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { Survey } from '../../api/dtos/survey-assignment.dto';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';
import SurveyTable from '../../components/adminLandingPage/SurveyTable';


const AdminLandingPage: React.FC = () => {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery<Survey[], Error>('surveyList', () =>
    apiClient.getMySurveys(),
  );

  const navigateTo = (route: string) => {
    navigate(route);
  };

  return (
    <Container maxW="7xl" mt={12}>
      <Flex>
    
          <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={() => navigateTo('/create-survey')}>
            Create Survey
          </Button>

          <Spacer/>

          <Box>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input placeholder='Search...' />
          </InputGroup>
          </Box>

          
     
      </Flex>
      {data && <SurveyTable data={data} />}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
    </Container>
  );
};

export default AdminLandingPage;
