import React from 'react';
import { screen } from '@testing-library/react';
import { render } from '../../test-utils';
import ExampleFormPage from './ExampleFormPage';

describe('ExampleFormPage', () => {
  it('should contain an example form in the page', async () => {
    render(<ExampleFormPage />);
    const exampleFormHeaderElement = screen.getByText('Example Form');
    expect(exampleFormHeaderElement).toBeInTheDocument();
  });
});
