import { useToast } from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import React, { useCallback } from 'react';
import { Response, SurveyData, Youth } from '../../api/dtos/survey-assignment.dto';
import { TOAST_POPUP_DURATION } from '../../pages/basicConstants';
import ConfirmAssignments from './ConfirmAssignments';
import ConfirmReviewerIdentity from './ConfirmReviewerIdentity';
import ConfirmYouth from './ConfirmYouth';
import ControlExplanation from './ControlExplanation';
import PreviewLetter from './PreviewLetter';
import createSurveyViewMachine from './stateMachine';
import SurveyForm from './SurveyForm';
import apiClient from '../../api/apiClient';
import ThankYou from './ThankYou';

interface SurveyViewControllerProps extends SurveyData {
  completeAssignment: (assignmentUuid: string, responses: Response[]) => Promise<void>;
}

/**
 * Responsible for rendering the current surview depending on the state of the survey view state machine.
 * Every state in the state machine is mapped to a component that will render a different view in the survey flow.
 *
 * e.g. fillOutSurvey -> SurveyForm, confirmLetter -> ConfirmLetter, ...
 *
 * Every time the state of the survey view machine changes, this component will re-render and display the corresponding view.
 */
const SurveyViewController: React.FC<SurveyViewControllerProps> = ({
  treatmentYouth,
  controlYouth,
  completeAssignment,
  reviewer,
  questions,
}) => {
  // See state machine visualization in `stateMachine.ts` for the entire state machine flow.
  const [state, send] = useMachine(createSurveyViewMachine(treatmentYouth, controlYouth));
  /**
   * Only call this when you know there are assignments left
   */
  const getCurrentYouth: () => Youth = useCallback(
    () => state.context.assignmentsLeft[0],
    [state.context.assignmentsLeft],
  );
  const toast = useToast();

  const confirmYouthCallback = useCallback(async () => {
    const youth = getCurrentYouth();
    try {
      await apiClient.startAssignment(youth.assignmentUuid);
      send('CONFIRM');
    } catch (error) {
      toast({
        title: 'Error submitting review.',
        description: `Failed to start a review for ${youth.firstName} ${youth.lastName}. Please try again. If this problem persists, please contact an administrator.`,
        status: 'error',
        duration: TOAST_POPUP_DURATION,
        isClosable: true,
      });
    }
  }, [getCurrentYouth, send, toast]);

  return (
    <>
      {/* One view per state in the machine: i.e. `state.matches("initial") && ...` */}
      {state.matches('confirmReviewerIdentity') && (
        <ConfirmReviewerIdentity
          name={`${reviewer.firstName} ${reviewer.lastName}`}
          email={reviewer.email}
          confirm={() => send('CONFIRM')}
          thisIsntMe={() => send('REJECT')}
        />
      )}

      {state.matches('confirmAssignments') && (
        <ConfirmAssignments
          youth={state.context.assignmentsLeft}
          confirm={(selectedYouth) => send('CONFIRM', { selectedYouth })}
        />
      )}

      {state.matches('confirmYouth') && (
        <ConfirmYouth
          // we know there is at least one element, otherwise it will epsilon transition to accept state
          youth={getCurrentYouth()}
          confirmYouth={confirmYouthCallback}
          rejectYouth={() => send('REJECT')}
        />
      )}

      {state.matches('fillOutSurvey') && (
        <SurveyForm
          youthName={`${getCurrentYouth().firstName} ${getCurrentYouth().lastName}`}
          questions={questions}
          continueAndSaveResponses={(responses: Response[]) =>
            send('CONFIRM', {
              responses,
            })
          }
          goBack={() => send('REJECT')}
          savedResponses={state.context.lastSavedResponses}
          mock={false}
        />
      )}

      {state.matches('confirmLetter') && (
        <PreviewLetter
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          savedSurveyResponses={state.context.lastSavedResponses!}
          getPreviewLetter={async () =>
            apiClient.getPreviewLetter(
              getCurrentYouth().assignmentUuid,
              state.context.lastSavedResponses ?? [],
            )
          } // TODO: Move this into parent component in SurveyPage
          confirmAndSaveResponses={async () => {
            const youth = getCurrentYouth();
            try {
              await completeAssignment(
                youth.assignmentUuid,
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                state.context.lastSavedResponses!,
              );
              send('CONFIRM');
            } catch (error) {
              toast({
                title: 'Error submitting review.',
                description: `Failed to submit a review for ${youth.firstName} ${youth.lastName}. Please try again. If this problem persists, please contact an administrator.`,
                status: 'error',
                duration: TOAST_POPUP_DURATION,
                isClosable: true,
              });
            }
          }}
          goBack={() => send('REJECT')}
        />
      )}

      {state.matches('repeatWithControl') && (
        <ControlExplanation continueWithControl={() => send('CONFIRM')} />
      )}

      {state.matches('finishedSurvey') && <ThankYou />}
    </>
  );
};

export default SurveyViewController;
