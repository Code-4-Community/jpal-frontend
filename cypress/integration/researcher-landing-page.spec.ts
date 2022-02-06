/// <reference types="cypress" />

describe('Researcher landing page', () => {
  describe('Researcher dashboard', () => {
    beforeEach(() => {
      // Programmatically login via Amazon Cognito API
      cy.loginAsResearcher();
      cy.visit('/private/dashboard');
    });

    it('shows dashboard', () => {
      cy.intercept('GET', '/user', [{ id: 1, email: 'testemail@test.com', role: 'admin' }]);
      cy.contains('testemail@test.com').should('be.visible');
    });
  });
});

export {};
