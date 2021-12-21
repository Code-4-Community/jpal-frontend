import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { render } from '../../test-utils';
import DEFAULT_QUESTIONS from './defaultQuestions';
import SurveyForm from './SurveyForm';

describe('SurveyForm', () => {
  const YOUTH_NAME = 'Nash Ville';
  const mockContinueAndSaveResponses = jest.fn();
  const mockGoBack = jest.fn();
  const defaultResponses = DEFAULT_QUESTIONS.map(({ question, options }) => ({
    question,
    selectedOption: options[4],
  }));
  beforeEach(() => {
    render(
      <SurveyForm
        youthName={YOUTH_NAME}
        questions={DEFAULT_QUESTIONS}
        continueAndSaveResponses={mockContinueAndSaveResponses}
        goBack={mockGoBack}
      />,
    );
  });

  it('should contain the youth name', () => {
    expect(screen.getByText(YOUTH_NAME, { exact: false })).toBeInTheDocument();
  });

  it('should contain every multiple choice field', () => {
    DEFAULT_QUESTIONS.forEach((value) => {
      const { question } = value;
      const multipleChoiceField = screen.getByLabelText(question, { exact: false });
      expect(multipleChoiceField).toBeInTheDocument();
    });
  });
  it('should contain a submit button', () => {
    const formButton = screen.getByRole('button', { name: /continue/i });
    expect(formButton).toBeInTheDocument();
  });

  it('should call continueAndSaveResponses when the form is submitted with proper selections', async () => {
    DEFAULT_QUESTIONS.forEach((value) => {
      const { question } = value;
      screen.getByTestId(`${question}-Always`).click();
    });

    const formButton = screen.getByRole('button', { name: /continue/i });
    formButton.click();
    await waitFor(() => {
      expect(mockContinueAndSaveResponses).toHaveBeenCalledWith(defaultResponses);
    });
  });

  it('should not call continueAndSaveResponses when any of the fields are missing a selection', async () => {
    DEFAULT_QUESTIONS.forEach((value, i) => {
      const { question } = value;
      // skip the first multiple choice question
      if (i > 0) screen.getByTestId(`${question}-Always`).click();
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
