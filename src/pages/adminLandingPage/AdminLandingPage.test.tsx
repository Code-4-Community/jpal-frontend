import { screen } from '@testing-library/react';
import React from 'react';
import apiClient from '../../api/apiClient';
import Role from '../../api/dtos/role';
import { Survey } from '../../api/dtos/survey-assignment.dto';
import User from '../../api/dtos/user.dto';
import { render } from '../../test-utils';
import AdminLandingPage from './AdminLandingPage';

jest.mock('../../api/apiClient.ts');

const exampleUser: User = {
  id: 1,
  firstName: 'first',
  lastName: 'last',
  email: 'test@test.com',
  role: Role.ADMIN,
  createdDate: new Date(2023, 10, 15)
};
const surveyList: Survey[] = [
  {
    uuid: '',
    creator: exampleUser,
    name: 'Example Survey',
    surveyTemplate: {
      creator: exampleUser,
      questions: [],
    },
    date: new Date(2000, 1, 1),
  },
];

describe('Admin Landing Page', () => {
  test('renders create survey button', () => {
    render(<AdminLandingPage />);
    const createSurveyButton = screen.getByText('Create Survey');
    expect(createSurveyButton).toBeInTheDocument();
  });

  test('renders survey table', async () => {
    apiClient.getMySurveys = jest.fn(() => Promise.resolve(surveyList)) as () => Promise<Survey[]>;
    render(<AdminLandingPage />);
    const surveyName = await screen.findByText('Survey Name');
    const surveyDate = await screen.findByText('Date Created');
    expect(surveyName).toBeInTheDocument();
    expect(surveyDate).toBeInTheDocument();
    expect.assertions(2);
  });
});
