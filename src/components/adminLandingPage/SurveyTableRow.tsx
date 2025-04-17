import { Td, Tr } from '@chakra-ui/react';
import React from 'react';

export interface SurveyTableRowProps {
  name: string;
  date: Date;
  uuid: string;
}

/**
 * Formats a date in the following format: Month (String) Day (Number), Year(Number)
 * Example : 09/02/2002 -> September 2, 2002
 */
export const dateFormatter = (date: Date): string =>
  date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const SurveyTableRow: React.FC<SurveyTableRowProps> = ({ name, date, uuid }) => (
  <Tr>
    <Td>
      <a
        href={`/survey/${uuid}`}
        style={{ textDecoration: 'none' }}
        onClick={() => console.log('poop')}
      >
        {name}
      </a>
    </Td>
    <Td>{dateFormatter(date)}</Td>
  </Tr>
);

export default SurveyTableRow;
