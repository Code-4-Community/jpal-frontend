/// <reference types="cypress" />


describe('Can add an admin', () => {
    it('can navigate to the add-admin-page and add an admin', () => {
        const email = "something@something.com"
        cy.intercept('POST', '/user', {
            email,
            role: "admin",
          }).as("createAdmin");
        cy.loginAsResearcher();
        cy.visit('/admin/add-new-admin'); 
        cy.get('#admin-email').click();
        cy.get('#admin-email').type(email); 
        cy.get('#submit-admin-email').click();
        cy.wait('@createAdmin');
        cy.contains(`Added the admin with the email ${email}.`);
        
    }) 
}); 
  
export {};
  