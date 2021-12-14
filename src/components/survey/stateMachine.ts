import { AnyEventObject, assign, createMachine, StateMachine, StateSchema } from 'xstate';
import { Response, Youth } from '../../api/dtos/survey-assignment.dto';

/**
 * The internal data saved in the state machine.
 */
interface Context {
  /**
   * Represents the remaining assignments that the user has to fill out a survey for.
   * The current assignment is the one at the top of the stack (the first element).
   */
  assignmentsLeft: Youth[];

  /**
   * Represents the responses that were saved in the last step of the survey.
   * Only relevant for passing responses data from the `fillOutSurvey` state to the `confirmLetter` state.
   */
  lastSavedResponses?: Response[];

  /**
   * Boolean flag reperesenting whether the user is reviewing the control youth.
   * (Second round of reviews).
   */
  isReviewingControlYouth: boolean;
}

// Link to visualization:
// https://stately.ai/viz/234d1c59-9f13-4c1c-97f1-6eb03081e446

/**
 * Represents a state machine that keeps track of the current state of the survey flow.
 * Each state in the machine represents a view in the survey flow.
 * Transitions represents moving between pages (e.g. Go back to the previous page).
 * Relevant data is stored in the "context" of the machine.
 * At any step in the machine the "current" assignment is the one at the top of the stack (the first element).
 *
 * @param initialAssignments the initial assignments that the state machine will use
 * @returns a state machine that models the views of the survey flow, starting with some initial assignments
 */
const createSurveyViewMachine = (
  treatmentYouth: Youth[],
  controlYouth: Youth[],
): StateMachine<Context, StateSchema<unknown>, AnyEventObject> =>
  createMachine<Context>(
    {
      id: 'survey-state-machine',
      initial: 'confirmReviewerIdentity',
      context: {
        assignmentsLeft: [...treatmentYouth],
        lastSavedResponses: undefined,
        isReviewingControlYouth: false,
      },
      states: {
        confirmReviewerIdentity: {
          on: {
            CONFIRM: 'confirmAssignments',
            REJECT: 'finishedSurvey',
          },
        },
        confirmAssignments: {
          on: {
            CONFIRM: {
              target: 'confirmYouth',
              actions: 'selectYouth',
            },
          },
        },
        confirmYouth: {
          on: {
            CONFIRM: 'fillOutSurvey',
            REJECT: {
              target: 'confirmYouth',
              actions: 'removeYouth',
            },
          },
          always: [
            { target: 'repeatWithControl', cond: 'hasControlYouth' },
            { target: 'finishedSurvey', cond: 'noMoreAssignments' },
          ],
        },
        fillOutSurvey: {
          on: {
            CONFIRM: {
              target: 'confirmLetter',
              actions: 'saveResponses',
            },
            REJECT: 'confirmYouth',
          },
        },
        confirmLetter: {
          on: {
            CONFIRM: {
              target: 'confirmYouth',
              actions: ['removeYouth', 'clearResponses'],
            },
            REJECT: 'fillOutSurvey',
          },
        },

        repeatWithControl: {
          on: {
            CONFIRM: {
              target: 'confirmAssignments',
              actions: ['resetWithControl'],
            },
          },
        },

        finishedSurvey: {
          type: 'final',
        },
      },
    },
    {
      guards: {
        hasControlYouth: (context) =>
          context.assignmentsLeft.length === 0 &&
          controlYouth.length > 0 &&
          !context.isReviewingControlYouth,
        noMoreAssignments: (context) =>
          context.assignmentsLeft.length === 0 &&
          (context.isReviewingControlYouth || controlYouth.length === 0),
      },
      actions: {
        removeYouth: assign({
          assignmentsLeft: (context) => context.assignmentsLeft.slice(1),
        }),
        saveResponses: assign({
          lastSavedResponses: (_context, event: AnyEventObject) => event.responses,
        }),
        clearResponses: assign({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          lastSavedResponses: (_context) => undefined,
        }),
        resetWithControl: assign({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          assignmentsLeft: (_context) => [...controlYouth],
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          isReviewingControlYouth: (_context) => true,
        }),
        selectYouth: assign({
          assignmentsLeft: (_context, event: AnyEventObject) => event.selectedYouth,
        }),
      },
    },
  );

export default createSurveyViewMachine;
