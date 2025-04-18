import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import apiClient, { SurveyDetail, IAssignment } from '../../api/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

interface SurveyDetailsRowProps {
  assignment: IAssignment;
}
const SurveyDetailsRow: React.FC<SurveyDetailsRowProps> = ({ assignment }) => {
  // Get badge color based on status using a function instead of nested ternaries
  const getStatusColorScheme = (curStatus: string) => {
    if (curStatus === 'incomplete') return 'red';
    if (curStatus === 'in_progress') return 'orange';
    return 'green';
  };

  const getBadgeForReminder = (reminded: boolean) => {
    if (reminded) {
      return <Badge colorScheme="blue">Yes</Badge>;
    }
    return <Badge colorScheme="gray">No</Badge>;
  };

  const { id, reviewer, youth, status, reminderSent } = assignment;

  return (
    <Tr key={id} _hover={{ bg: useColorModeValue('gray.50', 'gray.900') }}>
      <Td>{id}</Td>
      <Td>{`${reviewer.firstName} ${reviewer.lastName}`}</Td>
      <Td>{`${youth.firstName} ${youth.lastName}`}</Td>
      <Td>
        <Badge colorScheme={getStatusColorScheme(status)}>{status}</Badge>
      </Td>
      <Td>{getBadgeForReminder(reminderSent)}</Td>
    </Tr>
  );
};

interface SurveyDetailsTableProps {
  data: SurveyDetail;
}

const SurveyDetailsTable: React.FC<SurveyDetailsTableProps> = ({ data }) => (
  <Box overflowX="auto" boxShadow="sm" borderRadius="md" my={4}>
    <Table variant="simple" size="md">
      <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
        <Tr>
          <Th>ID</Th>
          <Th>Reviewer</Th>
          <Th>Youth</Th>
          <Th>Status</Th>
          <Th>Reminder Sent?</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.assignments.map((assignment: IAssignment) => (
          <SurveyDetailsRow assignment={assignment} key={assignment.uuid} />
        ))}
      </Tbody>
    </Table>
  </Box>
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
          <Heading size="lg" mb={6}>
            Survey Details for{' '}
            <Text as="span" fontWeight="bold" color="blue.500">
              {data.name}
            </Text>
          </Heading>
          <SurveyDetailsTable data={data} />
        </>
      )}
    </>
  );
};

export default SurveyDetailsPage;
