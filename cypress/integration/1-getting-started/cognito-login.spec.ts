/// <reference types="cypress" />

describe('Cognito Login', () => {
  describe('Login as researcher', () => {
    beforeEach(() => {
      // Programmatically login via Amazon Cognito API
      cy.loginAsResearcher();
      cy.visit('/private');
    });

    it('shows onboarding', () => {
      cy.contains('Learn Chakra').should('be.visible');
    });
  });

  describe('Login as admin', () => {
    beforeEach(() => {
      // Programmatically login via Amazon Cognito API
      cy.loginAsAdmin();
      cy.visit('/private');
    });

    it('shows onboarding', () => {
      cy.contains('Learn Chakra').should('be.visible');
    });
  });
});

export {};
