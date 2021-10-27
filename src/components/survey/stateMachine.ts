import {
  AnyEventObject,
  assign,
  createMachine,
  Event,
  EventData,
  SCXML,
  SingleOrArray,
  StateMachine,
  StateSchema,
} from 'xstate';
import { FormValues } from '../form/Form';

/**
 * The internal data saved in the state machine.
 */
interface Context {
  /**
   * Represents the remaining assignments that the user has to fill out a survey for.
   * The current assignment is the one at the top of the stack (the last element).
   */
  assignmentsLeft: string[]; // string for illustration, should be an Assignment

  /**
   * Represents the responses that were saved in the last step of the survey.
   * Only relevant for passing responses data from the `fillOutSurvey` state to the `confirmLetter` state.
   */
  lastSavedResponses?: FormValues;
}

// Link to visualization:
// https://stately.ai/viz/234d1c59-9f13-4c1c-97f1-6eb03081e446

/**
 * Represents a state machine that keeps track of the current state of the survey flow.
 * Each state in the machine represents a view in the survey flow.
 * Transitions represents moving between pages (e.g. Go back to the previous page).
 * Relevant data is stored in the "context" of the machine.
 * At any step in the machine the "current" assignment is the one at the top of the stack (the last element).
 *
 * @param initialAssignments the initial assignments that the state machine will use
 * @returns a state machine that models the views of the survey flow, starting with some initial assignments
 */
const createSurveyViewMachine = (
  initialAssignments: string[],
): StateMachine<Context, StateSchema<unknown>, AnyEventObject> =>
  createMachine<Context>(
    {
      id: 'survey-state-machine',
      initial: 'confirmReviewerIdentity',
      context: {
        assignmentsLeft: initialAssignments,
        lastSavedResponses: undefined,
      },
      states: {
        confirmReviewerIdentity: {
          on: {
            CONFIRM: 'confirmAssignments',
            REJECT: 'wrongReviewer',
          },
        },
        wrongReviewer: {
          type: 'final',
        },
        confirmAssignments: {
          on: {
            CONFIRM: {
              target: 'confirmYouth',
              actions: assign({
                assignmentsLeft: ['Alice', 'Bob', 'Charlie'],
              }),
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
          always: [{ target: 'finishedSurvey', cond: 'noMoreAssignments' }],
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
        finishedSurvey: {
          type: 'final',
        },
      },
    },
    {
      guards: {
        noMoreAssignments: (context) => context.assignmentsLeft.length === 0,
      },
      actions: {
        removeYouth: assign({
          assignmentsLeft: (context) => context.assignmentsLeft.slice(1),
        }),
        saveResponses: assign({
          lastSavedResponses: (_context, event) => event.responses,
        }),
        clearResponses: assign({
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          lastSavedResponses: (_context) => undefined,
        }),
      },
    },
  );

export type TransitionAction = (
  event: SingleOrArray<Event<AnyEventObject>> | SCXML.Event<AnyEventObject>,
  payload?: EventData | undefined,
) => void;

export default createSurveyViewMachine;
