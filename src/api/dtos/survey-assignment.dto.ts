// DTOs for surveys and assignments

import User from './user.dto';

export interface SurveyData {
  reviewer: Reviewer;
  controlYouth: Youth[];
  treatmentYouth: Youth[];
  questions: Question[];
}

export interface Survey {
  name: string;
  creator: User;
  uuid: string;
  surveyTemplate: SurveyTemplate;
  date: Date;
}

export interface SurveyTemplate {
  creator: User;
  questions: Question[];
}

export interface Question {
  question: string;
  options: string[];
}

export interface Youth extends PersonInfo {
  assignmentUuid: string;
}

export type Reviewer = PersonInfo;

interface PersonInfo {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Response {
  question: string;
  selectedOption: string;
}
