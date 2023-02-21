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
import apiClient from '../../api/apiClient';
import { Survey } from '../../api/dtos/survey-assignment.dto';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';
import SurveyTable from '../../components/adminLandingPage/SurveyTable';

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
          <InputGroup zIndex={0}>
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
