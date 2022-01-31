import { screen } from '@testing-library/react';
import AddAdminPage from './AddAdminPage';
import { render } from '../../test-utils';

describe('Add Admin Page', () => {
  test('renders Add New Admin heading', () => {
    render(<AddAdminPage />);
    const heading = screen.getByText('Add New Admin');
    expect(heading).toBeInTheDocument();
  });
});
