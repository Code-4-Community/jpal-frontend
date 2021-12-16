import { Container } from '@chakra-ui/react';
import React from 'react';
import { Youth } from '../../api/dtos/survey-assignment.dto';
import ConfirmAssignments from '../../components/survey/ConfirmAssignments';

const YOUTH: Youth[] = [
  { email: 'one@email.com', firstName: 'Alan', lastName: 'Turing', assignmentUuid: '1' },
  { email: 'two@email.com', firstName: 'Alonzo', lastName: 'Church', assignmentUuid: '2' },
  { email: 'three@email.com', firstName: 'Haskell', lastName: 'Curry', assignmentUuid: '3' },
  { email: 'four@email.com', firstName: 'Haskell', lastName: 'Curry', assignmentUuid: '4' },
];

const ConfirmAssignmentsPage: React.FC = () => (
  <Container>
    <ConfirmAssignments youth={YOUTH} confirm={() => {}} />
  </Container>
);

export default ConfirmAssignmentsPage;
