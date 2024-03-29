import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

export interface SurveyTableRowProps {
  name: string;
  date: Date;
}

/**
 * Formats a date in the following format: Month (String) Day (Number), Year(Number)
 * Example : 09/02/2002 -> September 2, 2002
 */
export const dateFormatter = (date: Date): string =>
  date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const SurveyTableRow: React.FC<SurveyTableRowProps> = ({ name, date }) => (
  <Tr>
    <Td>{name}</Td>
    <Td>{dateFormatter(date)}</Td>
  </Tr>
);

export default SurveyTableRow;
