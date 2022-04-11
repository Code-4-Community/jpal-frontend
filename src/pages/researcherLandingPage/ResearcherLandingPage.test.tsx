import { screen } from '@testing-library/react';
import React from 'react';
import apiClient from '../../api/apiClient';
import { render } from '../../test-utils';
import ResearcherLandingPage from './ResearcherLandingPage';
import User from '../../api/dtos/user.dto';

jest.mock('../../api/apiClient');

describe('Landing', () => {
  test('renders researcher landing page list of admins', async () => {
    apiClient.getAdmins = jest.fn(() =>
      Promise.resolve([
        { id: 1, firstName: 'first', lastName: 'last', email: 'test@test.com', role: 'admin' },
      ]),
    ) as () => Promise<User[]>;
    render(<ResearcherLandingPage userAvatarClicked={false} />);
    const testEmail = await screen.findByText('test@test.com');
    expect(testEmail).toBeInTheDocument();
    const testFirstName = await screen.findByText(/first/);
    expect(testFirstName).toBeInTheDocument();
    const testLastName = await screen.findByText(/last/);
    expect(testLastName).toBeInTheDocument();
  });
});
