import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import apiClient, { SurveyDetail, IAssignment } from '../../api/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const SurveyDetailsPage: React.FC = () => {
  const { survey_uuid: surveyUuid } = useParams<{ survey_uuid: string }>();
  const { isLoading, error, data } = useQuery<SurveyDetail, Error>('surveyList', () =>
    apiClient.getSurveyAssignments(surveyUuid),
  );

  return (
    <>
      <a href="/private">
        <Button>Back to surveys</Button>
      </a>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
      {data && (
        <>
          <h1>
            Survey Details for <span style={{ fontWeight: 'bold' }}>{data.name}</span>
          </h1>
          <Table>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Reviewer</Th>
                <Th>Youth</Th>
                <Th>Status</Th>
                <Th>Reminder Sent?</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.assignments.map((assignment: IAssignment) => (
                <Tr key={assignment.id}>
                  <Td>{assignment.id}</Td>
                  <Td>{`${assignment.reviewer.firstName} ${assignment.reviewer.lastName}`}</Td>
                  <Td>{`${assignment.youth.firstName} ${assignment.youth.lastName}`}</Td>
                  <Td>{assignment.status}</Td>
                  <Td>{assignment.reminderSent ? 'Yes' : 'No'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default SurveyDetailsPage;
