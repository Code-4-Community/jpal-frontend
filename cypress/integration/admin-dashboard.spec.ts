/// <reference types="cypress" />

describe('Cognito Login', () => {
  describe('Login as researcher', () => {
    beforeEach(() => {
      // Programmatically login via Amazon Cognito API
      cy.loginAsResearcher();
      cy.visit('/admin/dashboard');
    });

    it('shows dashboard', () => {
      cy.intercept('GET','/user',[{id : 1, email : 'testemail@test.com', role : 'admin'}])
      cy.contains('testemail@test.com').should('be.visible');
    });
  });

});

export {};
