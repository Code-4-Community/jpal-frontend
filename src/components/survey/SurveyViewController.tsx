import { useMachine } from '@xstate/react';
import React from 'react';
import { SurveyData, Youth } from '../../api/dtos/assignment.dto';
import { FormValues } from '../form/Form';
import ConfirmYouth from './ConfirmYouth';
import ControlExplanation from './ControlExplanation';
import defaultQuestions from './defaultQuestions';
import PreviewLetter from './PreviewLetter';
import ReviewerConfirmation from './ReviewerConfirmation';
import createSurveyViewMachine from './stateMachine';
import SurveyConfirmAssignments from './SurveyConfirmAssignments';
import SurveyConfirmation from './SurveyConfirmation';
import SurveyForm from './SurveyForm';

/**
 * Responsible for rendering the current survey view depending on the state of the survey view state machine.
 * Every state in the state machine is mapped to a component that will render a different view in the survey flow.
 *
 * e.g. fillOutSurvey -> SurveyForm, confirmLetter -> ConfirmLetter, ...
 *
 * Every time the state of the survey view machine changes, this component will re-render and display the corresponding view.
 */
const SurveyViewController: React.FC<SurveyData> = ({ uuid, treatmentYouth, controlYouth }) => {
  // See state machine visualization in `stateMachine.ts` for the entire state machine flow.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, send] = useMachine(createSurveyViewMachine(treatmentYouth, controlYouth));
  const reviewerName = 'Jack Blanc';
  const reviewerEmail = 'Jack.Blanc@hey.com';
  // Only call this when you know there are assignments left
  const getCurrentYouth: () => Youth = () =>
    state.context.assignmentsLeft[state.context.assignmentsLeft.length - 1];

  return (
    <>
      {/* Eventually have one view per state in the machine: i.e. `state.matches("initial") && ...` */}

      {state.matches('confirmReviewerIdentity') && (
        <ReviewerConfirmation
          name={reviewerName}
          email={reviewerEmail}
          confirm={() => send('CONFIRM')}
          thisIsntMe={() => send('REJECT')}
        />
      )}

      {state.matches('confirmAssignments') && (
        <SurveyConfirmAssignments
          youth={state.context.assignmentsLeft}
          confirm={(selectedYouth) => send('CONFIRM', { selectedYouth })}
        />
      )}

      {state.matches('confirmYouth') && (
        <ConfirmYouth
          // we know there is at least one element, otherwise it will epsilon transition to accept state
          youth={getCurrentYouth()}
          confirmYouth={() => send('CONFIRM')}
          rejectYouth={() => send('REJECT')}
        />
      )}

      {state.matches('fillOutSurvey') && (
        <SurveyForm
          youthName={`${getCurrentYouth().firstName} ${getCurrentYouth().lastName}`}
          questions={defaultQuestions}
          continueAndSaveResponses={(values: FormValues) =>
            send('CONFIRM', {
              responses: values,
            })
          }
          goBack={() => send('REJECT')}
        />
      )}

      {state.matches('confirmLetter') && (
        <PreviewLetter
          confirmAndSaveResponses={() => send('CONFIRM')}
          goBack={() => send('REJECT')}
        />
      )}

      {state.matches('repeatWithControl') && (
        <ControlExplanation continueWithControl={() => send('CONFIRM')} />
      )}

      {state.matches('finishedSurvey') && <SurveyConfirmation />}
    </>
  );
};

export default SurveyViewController;
