/// <reference types="cypress" />

describe('Cognito Login', () => {
  beforeEach(() => {
    // Programmatically login via Amazon Cognito API
    cy.loginByCognitoApi(Cypress.env('cognito_username'), Cypress.env('cognito_password'));
  });

  it('shows onboarding', () => {
    cy.contains('Learn Chakra').should('be.visible');
  });
});

export { }