import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../test-utils';
import JPALMenu from './header/JPALMenu';

describe('JPAL menu', () => {
  it('should have three options for researchers', () => {
    render(<JPALMenu isResearcher={true} />);
    expect(screen.getByText('View Admins')).toBeInTheDocument();
    expect(screen.getByText('View Surveys')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('should have one option for admins', () => {
    render(<JPALMenu isResearcher={false} />);
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
    expect(screen.queryByText('View Admins')).toBeNull();
    expect(screen.queryByText('View Surveys')).toBeNull();
  });
});
