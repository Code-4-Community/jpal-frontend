import { Link, Td, Tr } from '@chakra-ui/react';
import React from 'react';

interface SurveyTableRowProps {
  surveyName: string;
  date: Date;
}

const dateFormatter = (date: Date) =>
  date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const SurveyTableRow: React.FC<SurveyTableRowProps> = ({ surveyName, date }) => (
  <Tr>
    <Td>{surveyName}</Td>
    <Td>{dateFormatter(date)}</Td>
    <Td fontStyle="italic">
      <Link href="/edit">Edit</Link>
    </Td>
    <Td fontStyle="italic">
      <Link href="/delete">Delete</Link>
    </Td>
  </Tr>
);

export default SurveyTableRow;
