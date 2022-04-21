import React from 'react';
import { screen } from '@testing-library/react';
import AddAdminPage from './AddAdminPage';
import { render } from '../../test-utils';

describe('Add Admin Page', () => {
  test('renders Add New Admin heading', () => {
    render(<AddAdminPage />);
    const heading = screen.getByText('Admin Profile');
    expect(heading).toBeInTheDocument();
  });
});
