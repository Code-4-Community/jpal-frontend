import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Button, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import apiClient, { SurveyDetail, IAssignment } from '../../api/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

const SurveyDetailsRow: React.FC<IAssignment> = ({ id, reviewer, youth, status, reminderSent }) => (
  <Tr key={id}>
    <Td>{id}</Td>
    <Td>{`${reviewer.firstName} ${reviewer.lastName}`}</Td>
    <Td>{`${youth.firstName} ${youth.lastName}`}</Td>
    <Td>{status}</Td>
    <Td>{reminderSent ? 'Yes' : 'No'}</Td>
  </Tr>
);

const SurveyDetailsTable: React.FC<SurveyDetail> = ({ data }) => (
  <Table variant="simple">
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
        <SurveyDetailsRow
          key={assignment.id}
          id={assignment.id}
          reviewer={assignment.reviewer}
          youth={assignment.youth}
          status={assignment.status}
          reminderSent={assignment.reminderSent}
        />
      ))}
    </Tbody>
  </Table>
);

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
          <SurveyDetailsTable data={data} />
        </>
      )}
    </>
  );
};

export default SurveyDetailsPage;
