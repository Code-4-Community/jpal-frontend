import { screen } from '@testing-library/react';
import React from 'react';
import apiClient from '../../api/apiClient';
import { render } from '../../test-utils';
import AdminDashboard from "./AdminDashboard";
import User from "../../api/dtos/user.dto";

jest.mock('../../api/apiClient');

describe('Landing', () => {
  test('renders learn react link', async() => {
    apiClient.getAdmins = (jest.fn(()=>
        Promise.resolve([{id : 1, email : 'test@test.com', role : 'admin'}]))) as () => Promise<User[]>
    render(<AdminDashboard />);
    const testEmail = screen.getByText('test@test.com');
    expect(testEmail).toBeInTheDocument();
  });
});
