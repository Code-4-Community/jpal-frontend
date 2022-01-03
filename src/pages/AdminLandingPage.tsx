import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Container,
} from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import apiClient from '../api/apiClient';
import { Survey } from '../api/dtos/survey-assignment.dto';
import SurveyTable from '../components/adminLandingPage/SurveyTable';
import ErrorAlert from '../components/ErrorAlert';
import LoadingSpinner from '../components/LoadingSpinner';

// TODO : get this from an API call :)
// const data = [
//   { surveyName: 'Survey #1', date: new Date() },
//   { surveyName: 'Survey #2', date: new Date() },
//   { surveyName: 'Survey #3', date: new Date() },
// ];

const AdminLandingPage: React.FC = () => {
  const { isLoading, error, data } = useQuery<Survey[], Error>('surveyList', () =>
    apiClient.getMySurveys(),
  );

  return (
    <Container maxW="7xl" mt={12}>
      <Flex>
        <Box>
          <Button leftIcon={<AddIcon />} colorScheme="teal">
            Create Survey
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
      {data && <SurveyTable data={data} />}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
    </Container>
  );
};

export default AdminLandingPage;
