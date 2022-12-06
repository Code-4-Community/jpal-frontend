/// <reference types="cypress" />

describe('Researcher landing page', () => {
  describe('Researcher dashboard', () => {
    beforeEach(() => {
      // Programmatically login via Amazon Cognito API
      cy.loginAsResearcher();
      cy.visit('/researcher/dashboard');
    });

    it('shows dashboard', () => {
      cy.intercept('GET', '/user', [
        {
          id: 1,
          email: 'testemail@test.com',
          role: 'admin',
          creation_date: new Date("2-6'2022"),
        },
      ]);
      cy.contains('testemail@test.com').should('be.visible');
    });
  });
});

export {};
