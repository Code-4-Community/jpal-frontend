import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Badge,
  Box,
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import apiClient, { SurveyDetail, Assignment } from '../../api/apiClient';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';
import { ASSIGNMENTS_CREATE_STATE_KEY } from '../createSurveyPage/CreateSurveyPage';
import { TOAST_POPUP_DURATION } from '../basicConstants';

// we only want to take a single assigment for a single row
interface SurveyDetailsRowProps {
  assignment: Assignment;
}
// row for the survey detail table
const SurveyDetailsRow: React.FC<SurveyDetailsRowProps> = ({ assignment }) => {
  // Get badge color based on status using a function instead of nested ternaries
  const getStatusColorScheme = (curStatus: string) => {
    if (curStatus === 'incomplete') return 'red';
    if (curStatus === 'in_progress') return 'orange';
    return 'green';
  };

  // used for both sent and reminder badges
  const getBadgeForReminder = (bool: boolean) => {
    if (bool) {
      return <Badge colorScheme="blue">Yes</Badge>;
    }
    return <Badge colorScheme="gray">No</Badge>;
  };

  const { id, reviewer, youth, status, reminderSent, sent } = assignment;

  return (
    <Tr key={id} _hover={{ bg: useColorModeValue('gray.50', 'gray.900') }}>
      <Td>{id}</Td>
      <Td>{`${reviewer.firstName} ${reviewer.lastName}`}</Td>
      <Td>{`${youth.firstName} ${youth.lastName}`}</Td>
      <Td>
        <Badge colorScheme={getStatusColorScheme(status)}>{status}</Badge>
      </Td>
      <Td>{getBadgeForReminder(sent)}</Td>
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
          <Th>Letter Sent</Th>
          <Th>Reminder Sent</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.assignments.map((assignment: Assignment) => (
          <SurveyDetailsRow assignment={assignment} key={assignment.uuid} />
        ))}
      </Tbody>
    </Table>
  </Box>
);

const SurveyDetailsPage: React.FC = () => {
  const { survey_uuid: surveyUuid } = useParams<{ survey_uuid: string }>();
  const { isLoading, error, data } = useQuery<SurveyDetail, Error>('surveyDetails', () =>
    apiClient.getSurveyAssignments(surveyUuid),
  );

  const toast = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!location.state || !location.state[ASSIGNMENTS_CREATE_STATE_KEY]) return;

    const assignmentsCreateStatus: { success: boolean | null; error: string } =
      location.state[ASSIGNMENTS_CREATE_STATE_KEY];
    let toastMessage: string;

    if (assignmentsCreateStatus.success) {
      toastMessage = 'Survey and assignments created!';
    } else if (assignmentsCreateStatus.success === null) {
      toastMessage = 'Survey created!';
    } else {
      toastMessage = `Warning: Survey created but failed to create assignments: ${assignmentsCreateStatus.error}`;
    }

    toast({
      status: assignmentsCreateStatus.success === false ? 'warning' : 'success',
      description: toastMessage,
      duration: TOAST_POPUP_DURATION,
      isClosable: true,
    });
  });

  return (
    <Container maxW="7xl">
      <Link to="/private">
        <Button marginBottom="10">Back to surveys</Button>
      </Link>
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
    </Container>
  );
};

export default SurveyDetailsPage;
