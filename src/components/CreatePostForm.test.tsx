import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../test-utils';
import CreatePostForm from './CreatePostForm';

describe('CreatePostForm', () => {
  const onSubmitMock = jest.fn();
  beforeEach(() => {
    render(<CreatePostForm onSubmit={onSubmitMock} />);
  });

  describe('fields', () => {
    it('should contain a field for user ID', async () => {
      const userIdInput = screen.getByLabelText(/user id/i);
      expect(userIdInput).toBeInTheDocument();
    });

    it('should contain a field for post title', () => {
      const titleInput = screen.getByLabelText(/title/i);
      expect(titleInput).toBeInTheDocument();
    });

    it('should contain a field for post body', () => {
      const bodyInput = screen.getByLabelText(/body/i);
      expect(bodyInput).toBeInTheDocument();
    });

    it('should contain a button for form submission', () => {
      const formButton = screen.getByRole('button', { name: /submit/i });
      expect(formButton).toBeInTheDocument();
    });
  });

  describe('submission', () => {
    it('should be able to be filled out and submitted', async () => {
      const userIdInput = screen.getByLabelText(/user id/i);
      const titleInput = screen.getByLabelText(/title/i);
      const bodyInput = screen.getByLabelText(/body/i);

      const formButton = screen.getByRole('button', { name: /submit/i });
      userEvent.type(userIdInput, '1');
      userEvent.type(titleInput, 'My Post Title');
      userEvent.type(bodyInput, 'My post body.');
      userEvent.click(formButton);
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledWith({
          userId: 1,
          title: 'My Post Title',
          body: 'My post body.',
        });
      });
    });

    it('should fail if user id field is empty', async () => {
      const titleInput = screen.getByLabelText(/title/i);
      const bodyInput = screen.getByLabelText(/body/i);
      const formButton = screen.getByRole('button', { name: /submit/i });
      userEvent.type(titleInput, 'My Post Title');
      userEvent.type(bodyInput, 'My post body.');
      userEvent.click(formButton);
      await waitFor(() => {
        const userIdErrorMessage = screen.getByText(/user id is required./i);
        expect(userIdErrorMessage).toBeInTheDocument();
      });
    });

    it('should fail if title field is empty', async () => {
      const userIdInput = screen.getByLabelText(/user id/i);
      const bodyInput = screen.getByLabelText(/body/i);
      const formButton = screen.getByRole('button', { name: /submit/i });
      userEvent.type(userIdInput, '1');
      userEvent.type(bodyInput, 'My post body.');
      userEvent.click(formButton);
      await waitFor(() => {
        const titleErrorMessage = screen.getByText(/title is required./i);
        expect(titleErrorMessage).toBeInTheDocument();
      });
    });
    it('should fail if body field is empty', async () => {
      const userIdInput = screen.getByLabelText(/user id/i);
      const titleInput = screen.getByLabelText(/title/i);
      const formButton = screen.getByRole('button', { name: /submit/i });
      userEvent.type(userIdInput, '1');
      userEvent.type(titleInput, 'My Post Title');
      userEvent.click(formButton);
      await waitFor(() => {
        const bodyErrorMessage = screen.getByText(/body is required./i);
        expect(bodyErrorMessage).toBeInTheDocument();
      });
    });
  });
});
