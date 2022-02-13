import { Container } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import { Response } from '../../api/dtos/survey-assignment.dto';
import ErrorAlert from '../../components/ErrorAlert';
import LoadingSpinner from '../../components/LoadingSpinner';
import SurveyViewController from '../../components/survey/SurveyViewController';

const SurveyPage: React.FC = () => {
  const { survey_uuid: surveyUuid, reviewer_uuid: reviewerUuid } = useParams<{
    survey_uuid: string;
    reviewer_uuid: string;
  }>();

  // Fetch survey assignments, refetch data after 24 hours or on page reload.
  const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000; // in ms
  const { isLoading, error, data } = useQuery(
    ['survey', surveyUuid, reviewerUuid],
    () => {
      if (!surveyUuid || !reviewerUuid) throw new Error();
      return apiClient.getSurvey(surveyUuid, reviewerUuid);
    },
    {
      staleTime: TWENTY_FOUR_HOURS,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  const handleCompleteAssignment = (assignmentUuid: string, responses: Response[]) =>
    apiClient.completeAssignment(assignmentUuid, responses);

  return (
    <Container maxW="3xl" marginY="4">
      {error && <ErrorAlert />}
      {isLoading && <LoadingSpinner />}
      {data && (
        <SurveyViewController
          reviewer={data.reviewer}
          questions={data.questions}
          treatmentYouth={data.treatmentYouth}
          controlYouth={data.controlYouth}
          completeAssignment={handleCompleteAssignment}
        />
      )}
    </Container>
  );
};

export default SurveyPage;
