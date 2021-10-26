import { useMachine } from '@xstate/react';
import React from 'react';
import { FormValues } from '../form/Form';
import defaultQuestions from './defaultQuestions';
import createSurveyViewMachine from './stateMachine';
import SurveyForm from './SurveyForm';

interface SurveyViewControllerProps {
  initialAssignments: string[];
}

const SurveyViewController: React.FC<SurveyViewControllerProps> = ({ initialAssignments }) => {
  // fetch all assignments, add all to stack
  // confirm filter all students by having reviewer select all students to review
  // for each assignment in the filtered stack:
  //  1. display a confirmation screen with the youth name
  //  2. render a form with the questions
  //  3. display the generated letter for confirmation, on submit, send the letter to the youth
  // Loop back to 1. if there are more assignments to review
  // Otherwise, display a thank you screen

  // See state machine visualization for the entire state machine flow
  const [state, send] = useMachine(createSurveyViewMachine(initialAssignments));

  return (
    <>
      {/* Eventually have one view per state in the machine: i.e. `state.matches("initial") && ...` */}
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
    </>
  );
};

export default SurveyViewController;
