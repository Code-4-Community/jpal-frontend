import { screen } from '@testing-library/react';
import React from 'react';
import Post from '../models/Post';
import { render } from '../test-utils';
import PostsList from './PostsList';

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

describe('PostsList', () => {
  beforeEach(() => {
    render(<PostsList posts={postsFixture} />);
  });
  it('should render all posts', () => {
    postsFixture.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
      expect(screen.getByText(post.body)).toBeInTheDocument();
    });
  });
});
