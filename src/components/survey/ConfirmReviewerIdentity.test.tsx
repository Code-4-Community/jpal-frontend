import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import ConfirmReviewerIdentity from './ConfirmReviewerIdentity';

describe('ConfirmReviewerIdentity', () => {
  const REVIEWER_NAME = 'Jane Doe';
  const REVIEWER_EMAIL = 'doe.j@school.edu';
  const confirm = jest.fn();
  const thisIsntMe = jest.fn();
  beforeEach(() => {
    render(
      <ConfirmReviewerIdentity
        name={REVIEWER_NAME}
        email={REVIEWER_EMAIL}
        confirm={confirm}
        thisIsntMe={thisIsntMe}
      />,
    );
  });

  it('should contain the reviewer name', () => {
    expect(screen.getByText(REVIEWER_NAME, { exact: false })).toBeInTheDocument();
  });

  it('should contain the reviewer email', () => {
    expect(screen.getByText(REVIEWER_EMAIL, { exact: false })).toBeInTheDocument();
  });

  it('should contain a confirm button', () => {
    const formButton = screen.getByRole('button', { name: /confirm/i });
    expect(formButton).toBeInTheDocument();
  });

  it("should contain a this isn't me button", () => {
    const formButton = screen.getByRole('button', { name: /this isn't me/i });
    expect(formButton).toBeInTheDocument();
  });

  it('should call confirm when the confirm button is clicked', async () => {
    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    confirmButton.click();
    expect(confirm).toHaveBeenCalled();
  });

  it("should call the this isn't me callback when the this isn't me button is pressed", () => {
    const thisIsntMeButton = screen.getByRole('button', { name: /this isn't me/i });
    thisIsntMeButton.click();
    expect(thisIsntMe).toHaveBeenCalled();
  });
});
