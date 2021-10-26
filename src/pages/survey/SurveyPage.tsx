import { Container } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import SurveyViewController from '../../components/survey/SurveyViewController';

const SurveyPage: React.FC = () => {
  const { survey_uuid: surveyUUID, reviewer_uuid: reviewerUUID } = useParams<{
    survey_uuid: string;
    reviewer_uuid: string;
  }>();

  // Fetch survey assignements:
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // in ms
  const { isLoading, error, data } = useQuery(['survey', surveyUUID, reviewerUUID], () => {}, {
    staleTime: TWENTY_FOUR_HOURS,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Container maxW="3xl" marginY="4">
      {isLoading && <div>Loading...</div>}
      {error && <div>Error</div>}
      {data && <SurveyViewController initialAssignments={data} />}
    </Container>
  );
};

export default SurveyPage;
