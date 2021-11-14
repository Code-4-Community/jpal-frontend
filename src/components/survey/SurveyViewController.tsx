import { useMachine } from '@xstate/react';
import React from 'react';
import { FormValues } from '../form/Form';
import defaultQuestions from './defaultQuestions';
import createSurveyViewMachine from './stateMachine';
import SurveyForm from './SurveyForm';

interface SurveyViewControllerProps {
  initialAssignments: string[];
}

/**
 * Responsible for rendering the current survey view depending on the state of the survey view state machine.
 * Every state in the state machine is mapped to a component that will render a different view in the survey flow.
 *
 * e.g. fillOutSurvey -> SurveyForm, confirmLetter -> ConfirmLetter, ...
 *
 * Every time the state of the survey view machine changes, this component will re-render and display the corresponding view.
 */
const SurveyViewController: React.FC<SurveyViewControllerProps> = ({ initialAssignments }) => {
  // See state machine visualization in `stateMachine.ts` for the entire state machine flow.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
