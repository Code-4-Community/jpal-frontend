import { screen } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import AdminLandingPage from './AdminLandingPage';

jest.mock('../../api/apiClient.ts');

describe('Admin Landing Page', () => {
  test('renders create survey button', () => {
    render(<AdminLandingPage />);
    const createSurveyButton = screen.getByText('Create Survey');
    expect(createSurveyButton).toBeInTheDocument();
  });

  test('renders survey table', () => {
    render(<AdminLandingPage />);
    expect.assertions(2);
    const surveyName = screen.getByText('Survey Name');
    const surveyDate = screen.getByText('Date Created');
    expect(surveyName).toBeInTheDocument();
    expect(surveyDate).toBeInTheDocument();
  });
});
