import { mount } from '@cypress/react';
import * as React from 'react';
import Landing from './Landing';
import { TestWrapper } from './test-utils';

describe('App', () => {
  it('should display Hello, World!', () => {
    cy.intercept('/', 'Hello, World!');
    mount(
      <TestWrapper>
        <Landing />
      </TestWrapper>,
    );
    cy.contains('Hello, World!');
  });

  it('should display error message if request is unsuccessful', () => {
    cy.intercept('/', { times: 100 }, { forceNetworkError: true });
    mount(
      <TestWrapper>
        <Landing />
      </TestWrapper>,
    );
    cy.contains('Error');
  });
});
