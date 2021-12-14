import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import SurveyConfirmAssignments from './SurveyConfirmAssignments';

const YOUTH = [
  { email: 'one@email.com', firstName: 'Alan', lastName: 'Turing', assignmentUuid: '1' },
  { email: 'two@email.com', firstName: 'Alonzo', lastName: 'Church', assignmentUuid: '2' },
  { email: 'three@email.com', firstName: 'Haskell', lastName: 'Curry', assignmentUuid: '3' },
];

describe('SurveyConfirmAssignments', () => {
  const mockConfirm = jest.fn();
  beforeEach(() => {
    render(<SurveyConfirmAssignments youth={YOUTH} confirm={mockConfirm} />);
  });

  it('should contain explanatory text', () => {
    expect(
      screen.getByText('Please confirm the youth you have supervised.', { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Uncheck any youth you have not supervised.', { exact: false }),
    ).toBeInTheDocument();
  });

  it('should contain every youth in the list', () => {
    YOUTH.forEach(({ firstName, lastName }) => {
      const checkboxField = screen.getByLabelText(`${firstName} ${lastName}`, { exact: false });
      expect(checkboxField).toBeInTheDocument();
    });
  });
  it('should contain a confirm button', () => {
    const formButton = screen.getByRole('button', { name: /confirm/i });
    expect(formButton).toBeInTheDocument();
  });

  it('should call continue when the form is submitted with selections', async () => {
    const formButton = screen.getByRole('button', { name: /confirm/i });
    formButton.click();
    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalledWith(YOUTH);
    });
  });

  it('should call continue with filtered selections', async () => {
    screen.getByTestId(`${2}`).click();

    const formButton = screen.getByRole('button', { name: /confirm/i });
    formButton.click();
    await waitFor(() => {
      expect(mockConfirm).toHaveBeenCalledWith(YOUTH.slice(0, 2));
    });
  });
});
