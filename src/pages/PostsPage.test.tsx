import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import apiClient from '../api/apiClient';
import Post from '../models/Post';
import { render } from '../test-utils';
import PostsPage from './PostsPage';

jest.mock('../api/apiClient');

const postsFixture: Post[] = [
  {
    id: 1,
    title: 'First Post',
    body: 'This is the first post',
  },
  {
    id: 2,
    title: 'Second Post',
    body: 'This is the second post',
  },
];

describe('PostsPage', () => {
  let getPostsMock: jest.Mock;
  let createPostMock: jest.Mock;

  beforeEach(() => {
    getPostsMock = apiClient.getPosts as jest.Mock;
    createPostMock = apiClient.createPost as jest.Mock;
  });
  it('should render the post page header', () => {
    render(<PostsPage />);
    const pageHeader = screen.getByText(/Hello from the Post Page/i);
    expect(pageHeader).toBeInTheDocument();
  });

  it('should render all posts in PostsList', async () => {
    getPostsMock.mockReturnValueOnce(Promise.resolve(postsFixture));
    render(<PostsPage />);

    const postTitleElements = postsFixture.map((post) => screen.findByText(post.title));
    const postBodyElements = postsFixture.map((post) => screen.findByText(post.title));
    await Promise.all(postTitleElements.map((element) => expect(element).toBeInTheDocument));
    await Promise.all(postBodyElements.map((element) => expect(element).toBeInTheDocument));
  });

  it('should show error if renders posts cannot be loaded', async () => {
    getPostsMock.mockRejectedValueOnce(new Error('Error'));
    render(<PostsPage />);
    expect(await screen.findByText(/Posts could not be loaded!/i)).toBeInTheDocument();
  });

  it('should show error toast if creating post is unsuccessful', async () => {
    createPostMock.mockRejectedValueOnce(new Error('Error'));
    render(<PostsPage />);

    const userIdInput = screen.getByLabelText(/user id/i);
    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);
    const formButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(userIdInput, '1');
    userEvent.type(titleInput, 'My Post Title');
    userEvent.type(bodyInput, 'My post body.');
    userEvent.click(formButton);

    expect(await screen.findByText(/There was an error creating your post./i)).toBeInTheDocument();
  });

  it('should show success toast if creating post is successful', async () => {
    createPostMock.mockResolvedValueOnce(null);
    render(<PostsPage />);

    const userIdInput = screen.getByLabelText(/user id/i);
    const titleInput = screen.getByLabelText(/title/i);
    const bodyInput = screen.getByLabelText(/body/i);
    const formButton = screen.getByRole('button', { name: /submit/i });

    userEvent.type(userIdInput, '1');
    userEvent.type(titleInput, 'My Post Title');
    userEvent.type(bodyInput, 'My post body.');
    userEvent.click(formButton);

    expect(
      await screen.findByText(/Your post My Post Title has been successfully created./i),
    ).toBeInTheDocument();
  });
});
