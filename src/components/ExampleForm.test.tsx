import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../test-utils';
import ExampleForm from './ExampleForm';

describe('ExampleForm', () => {
  describe('fields', () => {
    beforeEach(() => {
      render(<ExampleForm />);
    });
    it('should contain a field for favorite color', async () => {
      const favoriteColorInput = screen.getByLabelText(/favorite color/i);
      expect(favoriteColorInput).toBeInTheDocument();
    });

    it('should contain "Purple" as initial value for favorite color', async () => {
      const favoriteColorInput = screen.getByLabelText(/favorite color/i);
      expect(favoriteColorInput).toHaveValue('Purple');
    });

    it('should contain a button for form submission', async () => {
      const formButton = screen.getByRole('button', { name: /submit/i });
      expect(formButton).toBeInTheDocument();
    });
  });

  describe('submission', () => {
    const onSubmitMock = jest.fn();
    beforeEach(() => {
      render(<ExampleForm onSubmit={onSubmitMock} />);
    });

    it('should be be filled out and submitted', async () => {
      const favoriteColorInput = screen.getByLabelText(/favorite color/i);
      const formButton = screen.getByRole('button', { name: /submit/i });
      userEvent.clear(favoriteColorInput);
      userEvent.type(favoriteColorInput, 'blue');
      userEvent.click(formButton);
      await waitFor(() => {
        // Expect the function to have been called at least once
        expect(onSubmitMock).toHaveBeenCalled();
        // Get the 1st argument from the mock function call
        const onSubmitMockValues = onSubmitMock.mock.calls[0][0];
        expect(onSubmitMockValues).toEqual({ favoriteColor: 'blue' });
      });
    });

    it('should fail when favorite color is brown (ew)', async () => {
      const favoriteColorInput = screen.getByLabelText(/favorite color/i);
      const formButton = screen.getByRole('button', { name: /submit/i });
      userEvent.clear(favoriteColorInput);
      userEvent.type(favoriteColorInput, 'brown');
      userEvent.click(formButton);
      await waitFor(() => {
        const badFavoriteColorErrorMessage = screen.getByText(
          /Thats a bad opinion. Choose something else./i,
        );
        expect(badFavoriteColorErrorMessage).toBeInTheDocument();
      });
    });
  });
});