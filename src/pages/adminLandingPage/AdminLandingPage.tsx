import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Container } from '@chakra-ui/react';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { Survey } from '../../api/dtos/survey-assignment.dto';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';
import SurveyTable from '../../components/adminLandingPage/SurveyTable';

const AdminLandingPage: React.FC = () => {
  const { isLoading, error, data } = useQuery<Survey[], Error>('surveyList', () =>
    apiClient.getMySurveys(),
  );

  const navigate = useNavigate();

  return (
    <Container maxW="7xl" mt={12}>
      <Flex>
        <Box>
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={() => navigate('/private/survey/create')}
          >
            Create Survey
          </Button>
        </Box>
      </Flex>
      {data && <SurveyTable data={data} />}
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
    </Container>
  );
};

export default AdminLandingPage;
