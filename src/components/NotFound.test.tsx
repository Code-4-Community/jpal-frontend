import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../test-utils';
import NotFound from './NotFound';

describe('NotFound', () => {
  const goBack = jest.fn();
  beforeEach(() => {
    render(<NotFound goBack={goBack} />);
  });

  it('should contain the not found message', () => {
    expect(screen.getByText('404 Page not found', { exact: false })).toBeInTheDocument();
  });

  it('should contain a go back', () => {
    const formButton = screen.getByRole('button', { name: /Go Back/i });
    expect(formButton).toBeInTheDocument();
  });

  it('should call go back when the go back button is clicked', async () => {
    const goBackButton = screen.getByRole('button', { name: /Go Back/i });
    goBackButton.click();
    expect(goBack).toHaveBeenCalled();
  });
});
