import React from 'react';
import SurveyName from '../../components/survey/CreateSurvey/SurveyName';
import CreateSurveyQuestion from '../../components/survey/CreateSurvey/CreateSurveyQuestion';

const CreateSurvey: React.FC = () => (
  <>
    <SurveyName onSubmit={() => null} />
    <CreateSurveyQuestion
      question={{ question: 'question', options: ['test 1', 'test 2'] }}
      onSubmit={() => null}
    />
  </>
);

export default CreateSurvey;
