// DTOs for surveys and assignments

import { z } from 'zod';
import User from './user.dto';
import { Assignment } from '../apiClient';

export interface SurveyData {
  reviewer: Reviewer;
  controlYouth: Youth[];
  treatmentYouth: Youth[];
  questions: Question[];
  reviewerUUID: string;
}

export const surveySchema = z.object({
  name: z.string(),
  creator: z.any(),
  uuid: z.string(),
  surveyTemplate: z.any(),
  date: z.string().transform((date) => new Date(date)),
});

export const surveysSchema = z.array(surveySchema);

export interface Survey {
  name: string;
  creator: User;
  uuid: string;
  surveyTemplate: SurveyTemplate;
  date: Date;
  organizationName: string;
  imageURL: string;
  treatmentPercentage: number;
  assignments: Assignment[];
}

export interface SurveyTemplate {
  creator: User;
  questions: Question[];
}

export interface SurveyTemplateData {
  id: number;
  name: string;
}

export const surveyTemplateSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const surveyTemplatesSchema = z.array(surveyTemplateSchema);

export interface Question {
  question: string;
  options: string[];
}

export enum YouthRoles {
  TREATMENT = 'treatment',
  CONTROL = 'control',
}

export interface Youth extends PersonInfo {
  assignmentUuid: string;
  role: YouthRoles;
}

export type Reviewer = PersonInfo;

export interface PersonInfo {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Response {
  question: string;
  selectedOption: string;
}

export interface ResponseInfo {
  youth: PersonInfo;
  reviewer: PersonInfo;
  responses: {
    question: Question;
    option: string;
  }[];
}
