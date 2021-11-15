import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import SurveyTableRow from './SurveyTableRow';

const data = [
  { surveyName: 'Survey #1', date: new Date() },
  { surveyName: 'Survey #2', date: new Date() },
  { surveyName: 'Survey #3', date: new Date() },
];

const SurveyTable: React.FC = () => (
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
