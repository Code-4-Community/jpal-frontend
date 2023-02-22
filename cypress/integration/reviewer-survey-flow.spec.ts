/// <reference types="cypress" />
import faker from 'faker';
import { SurveyData, Youth } from '../../src/api/dtos/survey-assignment.dto';
import DEFAULT_QUESTIONS, { ALWAYS } from '../../src/components/survey/defaultQuestions';
/* eslint-disable @typescript-eslint/no-use-before-define */

const fakeSurveyUuid = 'fake-survey-uuid';
const fakeReviewerUuid = 'fake-reviewer-uuid';

const SURVEY_DATA_SMALL = {
  reviewer: {
    email: 'reviewer@email.com',
    firstName: 'Moses',
    lastName: 'Schönfinkel',
  },
  treatmentYouth: [
    { email: 'one@email.com', firstName: 'Alan', lastName: 'Turing', assignmentUuid: '1' },
    { email: 'two@email.com', firstName: 'Alonzo', lastName: 'Church', assignmentUuid: '2' },
  ],
  controlYouth: [
    { email: 'three@email.com', firstName: 'Haskell', lastName: 'Curry', assignmentUuid: '3' },
  ],
  questions: DEFAULT_QUESTIONS,
};

function generateYouthFromNames(names: string[]): Youth[] {
  return names.map((name, index) => {
    const [firstName, lastName] = name.split(' ');
    return {
      email: `${firstName.toLowerCase()}@email.com`,
      firstName,
      lastName,
      assignmentUuid: `fake-assignment-uuid-${index}`,
    };
  });
}

// To ensure SURVEY_DATA_LARGE names are consistent between runs, set the seed to some value
faker.seed(123);
/**
 * 32 youth, 16 in each group.
 * Every other youth is chosen,
 * then of those chosen only every other is actually reviewed.
 * So this number should be divisible by 4. (16%4=0)
 */
const SURVEY_DATA_LARGE = {
  reviewer: {
    email: 'reviewer@email.com',
    firstName: 'Moses',
    lastName: 'Schönfinkel',
  },
  treatmentYouth: generateYouthFromNames(
    Array(16)
      .fill(undefined)
      .map(() => `${faker.name.firstName()} ${faker.name.lastName()}`),
  ),
  controlYouth: generateYouthFromNames(
    Array(16)
      .fill(undefined)
      .map(() => `${faker.name.firstName()} ${faker.name.lastName()}`),
  ),
  questions: DEFAULT_QUESTIONS,
};

const SURVEY_DATA_ONLY_TREATMENT_YOUTH = {
  ...SURVEY_DATA_SMALL,
  controlYouth: [],
};
describe('Reviewer Survey Flow', () => {
  it('can complete a small survey by filling out all surveys', () => {
    interceptAPICalls(SURVEY_DATA_SMALL);
    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    testReviewerConfirmationPage();
    reviewAllYouth(SURVEY_DATA_SMALL.treatmentYouth);
    continueToReviewControlYouth();
    reviewAllYouth(SURVEY_DATA_SMALL.controlYouth);
    testFinishedSurveyPage();
  });

  it('can complete a small survey by filling skipping every student individually', () => {
    interceptAPICalls(SURVEY_DATA_SMALL);
    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    testReviewerConfirmationPage();
    skipReviewingAllYouth(SURVEY_DATA_SMALL.treatmentYouth);
    continueToReviewControlYouth();
    skipReviewingAllYouth(SURVEY_DATA_SMALL.controlYouth);
    testFinishedSurveyPage();
  });

  it('can complete a small survey by unchecking every student on the confirmation page', () => {
    interceptAPICalls(SURVEY_DATA_SMALL);
    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    testReviewerConfirmationPage();
    uncheckAllAssignments(SURVEY_DATA_SMALL.treatmentYouth);
    continueToReviewControlYouth();
    uncheckAllAssignments(SURVEY_DATA_SMALL.controlYouth);
    testFinishedSurveyPage();
  });

  it('should only show treatment youth if there are no control youth', () => {
    interceptAPICalls(SURVEY_DATA_ONLY_TREATMENT_YOUTH);

    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    testReviewerConfirmationPage();
    reviewAllYouth(SURVEY_DATA_SMALL.treatmentYouth);
    testFinishedSurveyPage();
  });

  /**
   * This test checks that:
   * 1. The flow supports a large number of youth (32)
   * 2. The flow supports both unchecking, skipping, and completing surveys
   * 3. The flow supports both treatment and control youth
   */
  it('can complete a large survey by filling out some surveys and skipping others', () => {
    interceptAPICalls(SURVEY_DATA_LARGE);
    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    testReviewerConfirmationPage();
    reviewSomeAndSkipSome(SURVEY_DATA_LARGE.treatmentYouth);
    continueToReviewControlYouth();
    reviewSomeAndSkipSome(SURVEY_DATA_LARGE.controlYouth);
    testFinishedSurveyPage();
  });

  it('can immediately end the survey', () => {
    interceptAPICalls(SURVEY_DATA_SMALL);
    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    selectThisIsntMe();
    testFinishedSurveyPage();
  });

  it('should allow users to go back from preview letter and change answers', () => {
    interceptAPICalls(SURVEY_DATA_ONLY_TREATMENT_YOUTH);
    cy.visit(`/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`);
    testReviewerConfirmationPage();
    confirmAssignments(SURVEY_DATA_SMALL.treatmentYouth);
    testFillOutSurvey(SURVEY_DATA_SMALL.treatmentYouth[0]);
    cy.get('button').contains('Go Back').click();
    SURVEY_DATA_SMALL.questions.forEach((question) => {
      cy.get(`[data-cy="${question.question}-${ALWAYS}"]`).should('have.attr', 'data-checked');
    });
    cy.get('button').contains('Continue').click();
    testPreviewLetter(SURVEY_DATA_SMALL.treatmentYouth[0]);

    testFillOutSurvey(SURVEY_DATA_SMALL.treatmentYouth[1]);
    cy.get('button').contains('Go Back').click();
    cy.get(`[data-cy="go-back-button"]`).click();
    testFillOutSurvey(SURVEY_DATA_SMALL.treatmentYouth[1]);
    testPreviewLetter(SURVEY_DATA_SMALL.treatmentYouth[1]);
    testFinishedSurveyPage();
  });
});

function testFinishedSurveyPage() {
  cy.contains('Thank you for completing our survey(s)!').should('be.visible');
}

function interceptAPICalls(surveyData: SurveyData) {
  cy.intercept(
    'GET',
    `http://localhost:5000/survey/${fakeSurveyUuid}/${fakeReviewerUuid}`,
    surveyData,
  ).as('getSurvey');

  surveyData.treatmentYouth.forEach((youth) => {
    cy.intercept('POST', `http://localhost:5000/assignment/${youth.assignmentUuid}`, {}).as(
      `completeAssignment-${youth.assignmentUuid}`,
    );
  });

  surveyData.controlYouth.forEach((youth) => {
    cy.intercept('POST', `http://localhost:5000/assignment/${youth.assignmentUuid}`, {}).as(
      `completeAssignment-${youth.assignmentUuid}`,
    );
  });

  surveyData.treatmentYouth.forEach((youth) => {
    cy.intercept("PATCH", `http://localhost:5000/assignment/${youth.assignmentUuid}`, {}).as(
      `startAssignment-${youth.assignmentUuid}`,
    )
  })

  surveyData.controlYouth.forEach((youth) => {
    cy.intercept("PATCH", `http://localhost:5000/assignment/${youth.assignmentUuid}`, {}).as(
      `startAssignment-${youth.assignmentUuid}`,
    )
  })
  // ALl preview letters are the same
  cy.intercept('POST', `http://localhost:5000/assignment/preview-letter/*`, {
    shouldBeSent: true,
    date: '2022-03-10T23:53:42.899Z',
    greeting: 'To Whom It May Concern',
    paragraphs: [
      'Joe Shmoe worked for me at the Wharton School during this past Summer. Overall, Joe was an exceptional employee.',
      'Joe always completed work related tasks in a timely manner.',
      'Joe was an incredibly effective communicator. Joe was excellent at following instructions.',
      "In addition to Joe's other strengths, Joe takes initiative, is trustworthy, is respectful, works well in teams, is good at responding to constructive criticism and is responsible.",
      'Given the resources, I would hire Joe as a regular employee. I invite you to contact me if you would like more information. I can be reached at c4cneu.jpal+ben.lerner@gmail.com.',
    ],
    closing: 'Sincerely',
    signature: { fullName: 'Ben Lerner', organization: 'The Wharton School' },
  }).as('previewLetter');
}

function reviewAllYouth(youth: Youth[]) {
  confirmAssignments(youth);
  completeAssignments(youth);
}

function skipReviewingAllYouth(youth: Youth[]) {
  confirmAssignments(youth);
  skipAllAssignments(youth);
}

function reviewSomeAndSkipSome(youth: Youth[]) {
  uncheckEveryOtherAssignment(youth);
  const everyOtherYouth = youth.filter((_, index) => index % 2 === 0);
  completeEveryOtherAssignment(everyOtherYouth);
}

function continueToReviewControlYouth() {
  cy.contains('Please continue to review additional workers').should('be.visible');
  cy.get('button').contains('Confirm').click();
}

function confirmAssignments(youth: Youth[]) {
  cy.contains('Please confirm the workers you have supervised.').should('be.visible');
  youth.forEach((y) => {
    cy.contains(`${y.firstName} ${y.lastName}`).should('be.visible');
  });
  cy.get('button').contains('Confirm').click();
}

function uncheckEveryOtherAssignment(youth: Youth[]): void {
  cy.contains('Please confirm the workers you have supervised.').should('be.visible');
  youth.forEach((y) => {
    cy.contains(`${y.firstName} ${y.lastName}`).should('be.visible');
  });

  cy.get('[type="checkbox"]').each(($el, index) => {
    if (index % 2 === 1) {
      cy.wrap($el).uncheck({ force: true });
    }
  });
  cy.get('button').contains('Confirm').click();
}

function uncheckAllAssignments(youth: Youth[]) {
  cy.contains('Please confirm the workers you have supervised.').should('be.visible');
  youth.forEach((y) => {
    cy.contains(`${y.firstName} ${y.lastName}`).should('be.visible');
  });

  cy.get('[type="checkbox"]').uncheck({ force: true });
  cy.get('button').contains('Confirm').click();
}

function completeAssignments(youth: Youth[]) {
  youth.forEach((y) => {
    completeAssignment(y);
  });
}

function completeEveryOtherAssignment(youth: Youth[]) {
  youth.forEach((y, index) => {
    if (index % 2 === 0) {
      completeAssignment(y);
    } else {
      skipSurvey(y);
    }
  });
}

function skipAllAssignments(youth: Youth[]) {
  youth.forEach((y) => {
    skipSurvey(y);
  });
}

function completeAssignment(youth: {
  email: string;
  firstName: string;
  lastName: string;
  assignmentUuid: string;
}) {
  testFillOutSurvey(youth);
  testPreviewLetter(youth);
}

function testPreviewLetter(youth: {
  email: string;
  firstName: string;
  lastName: string;
  assignmentUuid: string;
}) {
  cy.contains('Please review the letter below').should('be.visible');
  // TODO: Assert that the letter is reasonable
  cy.get('button').contains('Confirm').click();
  testCompleteAssignmentAPICall(youth);
}

function testStartAssignmentAPICall(youth: Youth) {
  cy.wait(`@startAssignment-${youth.assignmentUuid}`)
    .its('request.body')
    .should('equal', '')
}

function testCompleteAssignmentAPICall(youth: Youth) {
  cy.wait(`@completeAssignment-${youth.assignmentUuid}`)
    .its('request.body')
    .should('deep.equal', {
      responses: DEFAULT_QUESTIONS.map((q) => ({
        question: q.question,
        selectedOption: q.options[4],
      })),
    });
}

function skipSurvey(youth: Youth) {
  cy.contains(`${youth.firstName} ${youth.lastName}`).should('be.visible');
  cy.get('button').contains('I did not work with this person').click();
}

function testFillOutSurvey(youth: Youth) {
  cy.contains(`${youth.firstName} ${youth.lastName}`).should('be.visible');
  cy.get('button').contains('Complete the survey').click();
  testStartAssignmentAPICall(youth)
  cy.contains(`${youth.firstName} ${youth.lastName}`).should('be.visible');
  SURVEY_DATA_SMALL.questions.forEach((question) => {
    cy.get(`[data-cy="${question.question}-${ALWAYS}"]`).click();
  });

  cy.get('button').contains('Continue').click();
}

function testReviewerConfirmationPage() {
  cy.wait('@getSurvey');
  cy.contains(
    `${SURVEY_DATA_SMALL.reviewer.firstName} ${SURVEY_DATA_SMALL.reviewer.lastName}`,
  ).should('be.visible');
  cy.contains(SURVEY_DATA_SMALL.reviewer.email).should('be.visible');

  cy.get('button').contains('Confirm').click();
}

function selectThisIsntMe() {
  cy.wait('@getSurvey');
  cy.contains(
    `${SURVEY_DATA_SMALL.reviewer.firstName} ${SURVEY_DATA_SMALL.reviewer.lastName}`,
  ).should('be.visible');
  cy.contains(SURVEY_DATA_SMALL.reviewer.email).should('be.visible');

  cy.get('button').contains(`This isn't me.`).click();
}

export { };
