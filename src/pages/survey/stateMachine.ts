import {
  AnyEventObject,
  assign,
  createMachine,
  Event,
  EventData,
  SCXML,
  SingleOrArray,
} from 'xstate';
import { FormValues } from '../../components/form/Form';

interface Context {
  assignmentsLeft: string[]; // string for illustration, should be an Assignment
  lastSavedResponses?: FormValues;
}
// https://stately.ai/viz/234d1c59-9f13-4c1c-97f1-6eb03081e446
export default createMachine<Context>(
  {
    id: 'survey-state-machine',
    initial: 'confirmReviewerIdentity',
    context: {
      assignmentsLeft: [],
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
        assignmentsLeft: (_context, event) => event.responses,
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
