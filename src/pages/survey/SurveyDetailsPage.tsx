import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import User from '../../api/dtos/user.dto';
import { Reviewer, Survey, Youth } from '../../api/dtos/survey-assignment.dto';

export enum AssignmentStatus {
  INCOMPLETE = 'incomplete',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'complete',
}


export interface SurveyDetail extends Survey {
  assignments: IAssignment[];
}

export interface IAssignment {
  id: number;
  uuid: string;
  survey: Survey;
  reviewer: Reviewer;
  youth: Youth;
  status: AssignmentStatus;
  sent: boolean;
  responses: Response[];
  reminderSent: boolean;
  started: Date;
}

const SurveyDetailsPage: React.FC = () => {
  const { survey_uuid: surveyUuid } = useParams<{ survey_uuid: string }>();
  console.log(surveyUuid);

  const { isLoading, error, data } = useQuery<SurveyDetail, Error>('surveyList', () =>
    apiClient.getSurveyAssignments(surveyUuid),
  );

  console.log(data);

  return (
    <div>
      <h1>Survey Details for survey</h1>
      <p>Details about the survey will be displayed here. {surveyUuid}</p>
      {data?.assignments.map((assignment: IAssignment) => (
        <p>{assignment.id}</p>
      ))}
    </div>
  );
};
export default SurveyDetailsPage;
