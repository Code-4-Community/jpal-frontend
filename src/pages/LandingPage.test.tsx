import { screen } from '@testing-library/react';
import React from 'react';
import apiClient from '../api/apiClient';
import { render } from '../test-utils';
import LandingPage from './LandingPage';

jest.mock('../api/apiClient');

describe('Landing', () => {
  test('renders learn react link', () => {
    render(<LandingPage />);
    const linkElement = screen.getByText(/learn chakra/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders backend response', async () => {
    const mockedGetHello = apiClient.getHello as jest.Mock;
    mockedGetHello.mockReturnValue(Promise.resolve('Hello from Jest!'));
    render(<LandingPage />);
    const linkElement = await screen.findByText(/Hello from Jest!/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders a different backend response (mocks automatically cleared after every test)', async () => {
    const mockedGetHello = apiClient.getHello as jest.Mock;
    mockedGetHello.mockReturnValue(Promise.resolve('你好 from Jest!'));
    render(<LandingPage />);
    const linkElement = await screen.findByText(/你好 from Jest!/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders backend error', async () => {
    const mockedGetHello = apiClient.getHello as jest.Mock;
    mockedGetHello.mockRejectedValue(new Error('Error from Jest!'));
    render(<LandingPage />);
    const linkElement = await screen.findByText(/Error: Error from Jest!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
