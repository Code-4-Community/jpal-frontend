/// <reference types="cypress" />

describe('Admin Landing page', () => {
  describe('Admin dashboard', () => {
    beforeEach(() => {
      // Programmatically login via Amazon Cognito API
      cy.loginAsAdmin();
      cy.visit('/private');
    });

    it('shows dashboard', () => {
      cy.intercept('GET', '/survey', [
        {
          uuid: '',
          creator: { id: 1, email: 'testemail@test.com', role: 'admin' },
          name: 'Example Survey',
          surveyTemplate: {
            creator: { id: 1, email: 'testemail@test.com', role: 'admin' },
            questions: [],
          },
        },
      ]);
      cy.contains('Example Survey').should('be.visible');
    });
  });
});

export {};
