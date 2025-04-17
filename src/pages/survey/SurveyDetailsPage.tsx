import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import User from '../../api/dtos/user.dto';
import { Reviewer, Survey, Youth } from '../../api/dtos/survey-assignment.dto';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorAlert from '../../components/ErrorAlert';

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
  const { isLoading, error, data } = useQuery<SurveyDetail, Error>('surveyList', () =>
    apiClient.getSurveyAssignments(surveyUuid),
  );

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorAlert />}
      {data && (
        <>
          <h1>
            Survey Details for <span style={{ fontWeight: 'bold' }}>{data.name}</span>
          </h1>
          <h1>
            By:{' '}
            <span style={{ fontWeight: 'bold' }}>
              {`${data.creator.firstName} ${data.creator.lastName}`}
            </span>
          </h1>
          {data?.assignments.map((assignment: IAssignment) => (
            <div
              key={assignment.id}
              style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}
            >
              <h2 style={{ fontWeight: 'bold' }}>
                {' '}
                {assignment.reviewer.firstName} {assignment.reviewer.lastName}
              </h2>
              <p>
                {' '}
                <span style={{ fontWeight: 'bold' }}>Youth Name: </span>
                {`${assignment.youth.firstName} ${assignment.youth.lastName}`}
              </p>
              <p>
                <span style={{ fontWeight: 'bold' }}>Status: </span>
                {assignment.status}
              </p>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default SurveyDetailsPage;
