import { Td, Tr } from '@chakra-ui/react';
import React from 'react';
import dateFormatter from '../utils/dateFormat';

export interface SurveyTableRowProps {
  name: string;
  date: Date;
}

const SurveyTableRow: React.FC<SurveyTableRowProps> = ({ name, date }) => (
  <Tr>
    <Td>{name}</Td>
    <Td>{dateFormatter(date)}</Td>
  </Tr>
);

export default SurveyTableRow;
