// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import Amplify, { Auth } from 'aws-amplify';

Amplify.configure(Cypress.env('awsConfig'));

// Amazon Cognito
Cypress.Commands.add('loginByCognitoApi', (username, password) => {
  const log = Cypress.log({
    displayName: 'COGNITO LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    autoEnd: false,
  });

  log.snapshot('before');

  const signIn = Auth.signIn({ username, password });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cy.wrap(signIn, { log: false, timeout: 30000 }).then((cognitoResponse) => {
    const keyPrefixWithUsername = `${cognitoResponse.keyPrefix}.${cognitoResponse.username}`;

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.idToken`,
      cognitoResponse.signInUserSession.idToken.jwtToken,
    );

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.accessToken`,
      cognitoResponse.signInUserSession.accessToken.jwtToken,
    );

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.refreshToken`,
      cognitoResponse.signInUserSession.refreshToken.token,
    );

    window.localStorage.setItem(
      `${keyPrefixWithUsername}.clockDrift`,
      cognitoResponse.signInUserSession.clockDrift,
    );

    window.localStorage.setItem(
      `${cognitoResponse.keyPrefix}.LastAuthUser`,
      cognitoResponse.username,
    );

    window.localStorage.setItem('amplify-authenticator-authState', 'signedIn');
    log.snapshot('after');
    log.end();
  });
});

// Sign in as Admin
Cypress.Commands.add('loginAsAdmin', () => {
  cy.intercept('GET', '/auth/me', {
    id: 1,
    email: Cypress.env('cognito_username'),
    role: 'admin',
  });

  cy.loginByCognitoApi(Cypress.env('cognito_username'), Cypress.env('cognito_password'));
});

// Sign in as Researcher
Cypress.Commands.add('loginAsResearcher', () => {
  cy.intercept('GET', '/auth/me', {
    id: 1,
    email: Cypress.env('cognito_username'),
    role: 'researcher',
  });

  cy.loginByCognitoApi(Cypress.env('cognito_username'), Cypress.env('cognito_password'));
});
