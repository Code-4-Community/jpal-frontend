import { Container } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import React from 'react';
import { FormValues } from '../../components/form/Form';
import SurveyForm from '../../components/survey/SurveyForm';
import defaultQuestions from './defaultQuestions';
import stateMachine from './stateMachine';

const SurveyPage: React.FC = () => {
  // fetch all assignments, add all to stack
  // confirm filter all students by having reviewer select all students to review
  // for each assignment in the filtered stack:
  //  1. display a confirmation screen with the youth name
  //  2. render a form with the questions
  //  3. display the generated letter for confirmation, on submit, send the letter to the youth
  // Loop back to 1. if there are more assignments to review
  // Otherwise, display a thank you screen

  // See state machine visualization for the entire state machine flow
  const [state, send] = useMachine(stateMachine);

  return (
    <Container maxW="3xl" marginY="4">
      <SurveyForm
        youthName="Nash Ville"
        questions={defaultQuestions}
        continueAndSaveResponses={(values: FormValues) =>
          send('CONFIRM', {
            response: values,
          })
        }
        goBack={() => send('REJECT')}
      />
    </Container>
  );
};

export default SurveyPage;
