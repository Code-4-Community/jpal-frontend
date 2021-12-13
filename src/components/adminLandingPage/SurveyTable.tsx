import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import SurveyTableRow, { SurveyTableRowProps } from './SurveyTableRow';

interface SurveyTableProps {
  data: SurveyTableRowProps[];
}

const SurveyTable: React.FC<SurveyTableProps> = ({ data }) => (
  <Box mt={5} borderWidth={1} borderRadius="lg">
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Survey Name</Th>
          <Th>Date Created</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((survey) => (
          <SurveyTableRow surveyName={survey.surveyName} date={survey.date} />
        ))}
      </Tbody>
    </Table>
  </Box>
);
export default SurveyTable;
