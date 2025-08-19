import React, { useCallback } from 'react';
import Papa from 'papaparse';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';

export interface AssignmentRow {
  reviewerFirst: string;
  reviewerLast: string;
  reviewerEmail: string;
  youthFirst: string;
  youthLast: string;
  youthEmail: string;
}

// Map of readable CSV column names to interface field names
const CSV_COLUMN_MAP = {
  'Reviewer First': 'reviewerFirst',
  'Reviewer Last': 'reviewerLast',
  'Reviewer Email': 'reviewerEmail',
  'Youth First': 'youthFirst',
  'Youth Last': 'youthLast',
  'Youth Email': 'youthEmail',
};
const EXPECTED_COLUMNS = Object.keys(CSV_COLUMN_MAP) as (keyof typeof CSV_COLUMN_MAP)[];

export type UploadStatus = { success: true } | { success: false; error: string };

interface UploadAssignmentsFormProps {
  assignments: AssignmentRow[];
  setAssignments: React.Dispatch<React.SetStateAction<AssignmentRow[]>>;
  setUploadStatus: (status: UploadStatus) => void;
}

const UploadAssignmentsForm: React.FC<UploadAssignmentsFormProps> = ({
  assignments,
  setAssignments,
  setUploadStatus,
}) => {
  const validateCsv = useCallback((parsedData: Papa.ParseResult<unknown>): UploadStatus => {
    if (!parsedData.meta.fields) {
      return { success: false, error: 'Could not process CSV headers' };
    }

    const headers = parsedData.meta.fields?.map((col) => col.trim());

    const missingHeaders = EXPECTED_COLUMNS.filter(
      (expected_col) => !headers.includes(expected_col),
    );
    if (missingHeaders.length > 0) {
      return {
        success: false,
        error: `Given CSV is missing headers: ${missingHeaders.join(', ')}`,
      };
    }

    if (parsedData.data.length === 0) {
      return { success: false, error: 'Given CSV has no data' };
    }

    return { success: true };
  }, []);

  const onFormUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null) {
        setUploadStatus({ success: false, error: 'No file given' });
        return;
      }

      const file = event.target.files[0];
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        complete: (res: Papa.ParseResult<Record<string, string>>) => {
          const csvValidStatus = validateCsv(res);
          if (!csvValidStatus.success) {
            setUploadStatus({
              success: false,
              error: `Error processing file: ${csvValidStatus.error}`,
            });
            return;
          }

          if (res.data.length === 0) {
            setUploadStatus({ success: false, error: 'Given CSV has no data' });
            return;
          }

          const mappedData = res.data.map((row: Record<string, string>) =>
            Object.fromEntries(
              EXPECTED_COLUMNS.map((col) => [CSV_COLUMN_MAP[col], row[col].trim()]),
            ),
          );
          setAssignments(mappedData as unknown as AssignmentRow[]);

          setUploadStatus({ success: true });
        },
        error: (error) =>
          setUploadStatus({ success: false, error: `Error processing file: ${error.message}` }),
      });
    },
    [setUploadStatus, validateCsv, setAssignments],
  );

  return (
    <>
      <FormControl>
        <FormLabel display="flex">
          <b>Upload Assignments CSV: <a href="https://jpal-example-csv.s3.us-east-2.amazonaws.com/example-assignment.csv" download>Example CSV</a></b>
          <Tooltip
            label={
              <Stack>
                <Text>Required columns:</Text>
                <Text>• Reviewer First (reviewer&apos;s first name)</Text>
                <Text>• Reviewer Last (reviewer&apos;s last name)</Text>
                <Text>• Reviewer Email (reviewer&apos;s email address)</Text>
                <Text>• Youth First (youth&apos;s first name)</Text>
                <Text>• Youth Last (youth&apos;s last name)</Text>
                <Text>• Youth Email (youth&apos;s email address)</Text>
              </Stack>
            }
            placement="right"
            hasArrow
          >
            <QuestionIcon alignSelf="center" ml={2} />
          </Tooltip>
        </FormLabel>
        <Input type="file" accept=".csv" onChange={onFormUpload} />
      </FormControl>
      {assignments.length > 0 && (
        <Box maxH={500} overflowY="auto">
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Reviewer First</Th>
                <Th>Reviewer Last</Th>
                <Th>Reviewer Email</Th>
                <Th>Youth First</Th>
                <Th>Youth Last</Th>
                <Th>Youth Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {assignments.map((assignment) => (
                <Tr key={assignment.reviewerEmail + assignment.youthEmail}>
                  <Td>{assignment.reviewerFirst}</Td>
                  <Td>{assignment.reviewerLast}</Td>
                  <Td>{assignment.reviewerEmail}</Td>
                  <Td>{assignment.youthFirst}</Td>
                  <Td>{assignment.youthLast}</Td>
                  <Td>{assignment.youthEmail}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default UploadAssignmentsForm;
