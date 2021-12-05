import React from 'react';
import ReviewerConfirmation from '../../components/survey/ReviewerConfirmation';

const ReviewerConfirmationPage: React.FC = () => (
  <ReviewerConfirmation
    name="Jane Doe"
    email="doe.j@school.edu"
    confirm={() => undefined}
    thisIsntMe={() => undefined}
  />
);

export default ReviewerConfirmationPage;
