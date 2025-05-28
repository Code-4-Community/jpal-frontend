import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import apiClient, { Assignment, AssignmentStatus, SurveyDetail } from '../../api/apiClient';
import { ResponseInfo, YouthRoles } from '../../api/dtos/survey-assignment.dto';
import DisplaySurvey from './DisplaySurvey';
import ErrorAlert from '../ErrorAlert';

interface ResponseModalProps {
  assignment: Assignment;
  onClose: () => void;
}

const ResponseModal: React.FC<ResponseModalProps> = ({ assignment, onClose }) => {
  const { isLoading, data } = useQuery<ResponseInfo, Error>('assignmentResponse', async () =>
    apiClient.getAssignmentResponse(assignment.uuid),
  );

  return (
    <Modal isOpen onClose={onClose} size="6xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{`${assignment.reviewer.firstName}'s Responses`}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* eslint-disable-next-line no-nested-ternary */}
          {isLoading ? <Spinner /> : data ? <DisplaySurvey responseInfo={data} /> : <ErrorAlert />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

interface SurveyDetailsRowProps {
  assignment: Assignment;
  setModalAssignment: (assignment: Assignment) => void;
}
// row for the survey detail table
const SurveyDetailsRow: React.FC<SurveyDetailsRowProps> = ({ assignment, setModalAssignment }) => {
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

  const getBadgeForYouthRole = (role: YouthRoles) => {
    if (role === YouthRoles.TREATMENT) {
      return <Badge colorScheme="blue">Treatment</Badge>;
    }
    return <Badge colorScheme="gray">Control</Badge>;
  };

  const { id, reviewer, youth, status, reminderSent, sent, s3LetterLink } = assignment;

  return (
    <Tr key={id} _hover={{ bg: useColorModeValue('gray.50', 'gray.900') }}>
      <Td>{id}</Td>
      <Td>{`${reviewer.firstName} ${reviewer.lastName}`}</Td>
      <Td>{`${youth.firstName} ${youth.lastName}`}</Td>
      <Td>{getBadgeForYouthRole(youth.role)}</Td>
      <Td>
        <Badge colorScheme={getStatusColorScheme(status)}>{status}</Badge>
      </Td>
      <Td>{getBadgeForReminder(reminderSent)}</Td>
      <Td>{getBadgeForReminder(sent)}</Td>
      <Td>
        {s3LetterLink === null ? (
          'N/A'
        ) : (
          <Link href={s3LetterLink} target="_blank" rel="noreferrer" textDecoration="underline">
            View Letter
          </Link>
        )}
      </Td>
      <Td>
        {status === AssignmentStatus.COMPLETED ? (
          <Button size="sm" onClick={() => setModalAssignment(assignment)}>
            Responses
          </Button>
        ) : (
          'N/A'
        )}
      </Td>
    </Tr>
  );
};

interface SurveyDetailsTableProps {
  data: SurveyDetail;
}

const PAGE_SIZES = [10, 25, 50];

const SurveyDetailsTable: React.FC<SurveyDetailsTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [jumpToPage, setJumpToPage] = useState<string>('');
  const [modalAssignment, setModalAssignment] = useState<Assignment | null>(null);

  const totalPages = Math.ceil(data.assignments.length / pageSize);

  const tableRows = useMemo(
    () =>
      data.assignments.map((assignment: Assignment) => (
        <SurveyDetailsRow
          assignment={assignment}
          key={assignment.uuid}
          setModalAssignment={setModalAssignment}
        />
      )),
    [data],
  );

  const pageJump = useCallback(() => {
    const jumpToPageAsNumber = parseInt(jumpToPage, 10);
    if (Number.isNaN(jumpToPageAsNumber)) {
      return;
    }

    const destination = Math.max(Math.min(jumpToPageAsNumber, totalPages), 1);
    setCurrentPage(destination);
    setJumpToPage(`${destination}`);
  }, [setCurrentPage, setJumpToPage, jumpToPage, totalPages]);

  return (
    <Box overflowX="auto" boxShadow="sm" borderRadius="md" my={4} padding={15}>
      <Table variant="simple" size="md" pb={5} borderBottom="2px solid black">
        <Thead bg={useColorModeValue('gray.50', 'gray.800')}>
          <Tr>
            <Th>Assignment ID</Th>
            <Th>Reviewer</Th>
            <Th>Youth</Th>
            <Th>Group</Th>
            <Th>Status</Th>
            <Th>Reminder Sent</Th>
            <Th>Letter Sent</Th>
            <Th>Letter</Th>
            <Th>Responses</Th>
          </Tr>
        </Thead>
        <Tbody>{tableRows.slice((currentPage - 1) * pageSize, currentPage * pageSize)}</Tbody>
      </Table>
      <Flex mt={4} flexDirection="row" align="center" justifyContent="flex-end" gap={4}>
        <Flex justifyContent="flex-end" align="center">
          <IconButton
            icon={<ChevronLeftIcon />}
            size="sm"
            mr={4}
            onClick={() => setCurrentPage((page) => page - 1)}
            isDisabled={currentPage === 1}
            aria-label="Previous page"
          />
          <Text>
            Page {currentPage} of {totalPages}
          </Text>
          <IconButton
            icon={<ChevronRightIcon />}
            size="sm"
            ml={4}
            onClick={() => setCurrentPage((page) => page + 1)}
            isDisabled={currentPage >= totalPages}
            aria-label="Previous page"
          />
        </Flex>
        <Divider orientation="vertical" borderColor="black" borderWidth={0.5} height={5} />
        <Flex alignItems="center" gap={3} width="15%">
          <Button onClick={pageJump} px={5}>
            Go to
          </Button>
          <NumberInput
            value={jumpToPage}
            min={1}
            max={totalPages}
            onChange={(page) => setJumpToPage(page)}
            onBlur={() => pageJump()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                pageJump();
              }
            }}
          >
            <NumberInputField />
          </NumberInput>
        </Flex>
        <Divider orientation="vertical" borderColor="black" borderWidth={0.5} height={5} />
        <Flex>
          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              setCurrentPage(1);
              setJumpToPage('1');
            }}
            flexGrow={0}
          >
            {PAGE_SIZES.map((size) => (
              <option key={size} value={size}>{`${size} rows per page`}</option>
            ))}
          </Select>
        </Flex>
      </Flex>
      {modalAssignment !== null ? (
        <ResponseModal assignment={modalAssignment} onClose={() => setModalAssignment(null)} />
      ) : (
        <></>
      )}
    </Box>
  );
};

export default SurveyDetailsTable;
