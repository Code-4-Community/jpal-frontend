import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import ThankYou from './ThankYou';

describe('Survey ThankYou', () => {
  beforeEach(() => {
    render(<ThankYou />);
  });
  it('should contain the thank you text', () => {
    const thankYou = screen.getByText(/Thank you/i);
    expect(thankYou).toBeInTheDocument();
  });
});
