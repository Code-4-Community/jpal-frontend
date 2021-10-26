import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import defaultQuestions from '../../pages/survey/defaultQuestions';
import { render } from '../../test-utils';
import SurveyForm from './SurveyForm';

describe('ExampleForm', () => {
  const YOUTH_NAME = 'Nash Ville';
  const mockContinueAndSaveResponses = jest.fn();
  const mockGoBack = jest.fn();
  beforeEach(() => {
    render(
      <SurveyForm
        youthName={YOUTH_NAME}
        questions={defaultQuestions}
        continueAndSaveResponses={mockContinueAndSaveResponses}
        goBack={mockGoBack}
      />,
    );
  });

  it('should contain every multiple choice field', () => {
    defaultQuestions.forEach((value) => {
      const { question } = value;
      const multiipleChoiceField = screen.getByLabelText(question, { exact: false });
      expect(multiipleChoiceField).toBeInTheDocument();
    });
  });
  it('should contain a submit button', () => {
    const formButton = screen.getByRole('button', { name: /continue/i });
    expect(formButton).toBeInTheDocument();
  });

  it('should call continueAndSaveResponses when the form is submitted with proper selections', async () => {
    defaultQuestions.forEach((value) => {
      const { question, fieldName } = value;
      screen.getByTestId(`${fieldName}-Always`).click();
    });

    const formButton = screen.getByRole('button', { name: /continue/i });
    formButton.click();
    await waitFor(() => {
      expect(mockContinueAndSaveResponses).toHaveBeenCalledWith({
        initiative: 'Always',
        leadership: 'Always',
        responsibility: 'Always',
      });
    });
  });

  it('should not call continueAndSaveResponses when any of the fields are missing a selection', async () => {
    defaultQuestions.forEach((value, i) => {
      const { question, fieldName } = value;
      // skip the first multiple choice question
      if (i > 0) screen.getByTestId(`${fieldName}-Always`).click();
    });

    const formButton = screen.getByRole('button', { name: /continue/i });
    formButton.click();
    await new Promise((res) => setTimeout(res, 1000));
    expect(mockContinueAndSaveResponses).not.toHaveBeenCalled();
  });

  it('should call the goBack callback when the back arrow button is pressed', () => {
    screen.getByTestId('go-back-button').click();
    expect(mockGoBack).toHaveBeenCalled();
  });
});
