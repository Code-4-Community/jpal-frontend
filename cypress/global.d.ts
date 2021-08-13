/* eslint-disable @typescript-eslint/no-explicit-any */
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {  
      /**
       * Logs in to AWS Cognito via Amplify Auth API bypassing UI using Cypress Task
       */
      loginByCognitoApi(username: string, password: string): Chainable<any>;
    }
}