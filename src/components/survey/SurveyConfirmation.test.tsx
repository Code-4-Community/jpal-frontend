import { screen} from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import SurveyConfirmation from "./SurveyConfirmation";

describe('SurveyThankYou', () => {
  beforeEach(() => {
    render(<SurveyConfirmation />);
  });
  it('should contain the thank you text', () => {
    const thankYou = screen.getByText(/Thank you/i);
    expect(thankYou).toBeInTheDocument();
  });
});
