import { screen } from '@testing-library/react';
import nock from 'nock';
import React from 'react';
import Landing from './Landing';
import { render } from './test-utils';

test('renders learn react link', () => {
  render(<Landing />);
  const linkElement = screen.getByText(/learn chakra/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders backend response', async () => {
  nock('http://localhost:5000').get('/').reply(200, 'Hello from Jest!');
  render(<Landing />);
  const linkElement = await screen.findByText(/Hello from Jest!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders backend error', async () => {
  nock('http://localhost:5000').get('/').replyWithError('Error from Jest!');
  render(<Landing />);
  const linkElement = await screen.findByText(/Error: Error from Jest!/i);
  expect(linkElement).toBeInTheDocument();
});
