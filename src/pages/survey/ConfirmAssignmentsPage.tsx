import { Container } from '@chakra-ui/react';
import React from 'react';
import { Youth } from '../../api/dtos/assignment.dto';
import SurveyConfirmAssignments from '../../components/survey/SurveyConfirmAssignments';

const YOUTH: Youth[] = [
  { email: 'one@email.com', firstName: 'Alan', lastName: 'Turing', assignmentId: 1 },
  { email: 'two@email.com', firstName: 'Alonzo', lastName: 'Church', assignmentId: 2 },
  { email: 'three@email.com', firstName: 'Haskell', lastName: 'Curry', assignmentId: 3 },
  { email: 'four@email.com', firstName: 'Haskell', lastName: 'Curry', assignmentId: 4 },
];

const ConfirmAssignmentsPage: React.FC = () => (
  <Container>
    <SurveyConfirmAssignments youth={YOUTH} confirm={() => {}} />
  </Container>
);

export default ConfirmAssignmentsPage;
