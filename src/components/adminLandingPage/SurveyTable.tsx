import { Box, Table, Tbody, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { Survey } from '../../api/dtos/survey-assignment.dto';
import SurveyTableRow from './SurveyTableRow';

interface SurveyTableProps {
  data: Survey[];
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
          <SurveyTableRow name={survey.name} date={survey.date} />
        ))}
      </Tbody>
    </Table>
  </Box>
);
export default SurveyTable;
