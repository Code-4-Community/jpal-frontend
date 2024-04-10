// DTOs for surveys and assignments

import { z } from 'zod';
import User from './user.dto';

export interface SurveyData {
  reviewer: Reviewer;
  controlYouth: Youth[];
  treatmentYouth: Youth[];
  questions: Question[];
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

export interface Reviewer extends PersonInfo {
  reviewerUuid: string;
  secondaryEmail: string;
  phone: string;
}

interface PersonInfo {
  email: string;
  firstName: string;
  lastName: string;
}

export interface Response {
  question: string;
  selectedOption: string;
}
