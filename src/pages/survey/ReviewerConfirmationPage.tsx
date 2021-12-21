import React from 'react';
import ConfirmReviewerIdentity from '../../components/survey/ConfirmReviewerIdentity';

const ReviewerConfirmationPage: React.FC = () => (
  <ConfirmReviewerIdentity
    name="Jane Doe"
    email="doe.j@school.edu"
    confirm={() => undefined}
    thisIsntMe={() => undefined}
  />
);

export default ReviewerConfirmationPage;
