/// <reference types="cypress" />

describe('Can add an admin', () => {
  it('can navigate to the add-admin-page and add an admin', () => {
    const firstName = 'John';
    const lastName = 'Doe';
    const email = 'something@something.com';
    cy.intercept('POST', '/user', {
      firstName: 'something',
      lastName: 'somethingElse',
      email,
      role: 'admin',
    }).as('createAdmin');
    cy.loginAsResearcher();
    cy.visit('/private/add-new-admin');
    cy.get('#admin-email').click();
    cy.get('#admin-email').type(email);
    cy.get('#first-name').click();
    cy.get('#first-name').type(firstName);
    cy.get('#last-name').click();
    cy.get('#last-name').type(lastName);
    cy.get('#submit-admin-email').click();
    cy.wait('@createAdmin');
    cy.contains(`Added the admin with the email ${email}.`);
  });
});

export {};
