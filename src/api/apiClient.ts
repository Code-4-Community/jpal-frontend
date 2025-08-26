import { Auth } from 'aws-amplify';
import axios, { AxiosInstance } from 'axios';
import { Letter } from './dtos/letter';
import Role from './dtos/role';
import {
  Response,
  Survey,
  SurveyData,
  surveysSchema,
  Reviewer,
  Youth,
  PersonInfo,
  ResponseInfo,
  SurveyTemplateData,
  surveyTemplatesSchema,
} from './dtos/survey-assignment.dto';
import User from './dtos/user.dto';

export enum AssignmentStatus {
  INCOMPLETE = 'incomplete',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'complete',
}

export interface SurveyDetail extends Survey {
  assignments: Assignment[];
}

export interface Assignment {
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
  s3LetterLink: string | null;
}

const defaultBaseUrl = process.env.REACT_APP_API_BASE_URL ?? 'http://localhost:5000';
// Required to use nock with axios (note: do not use nock, just use jest to mock the apiClient)
axios.defaults.adapter = require('axios/lib/adapters/http');

interface ApiClientOptions {
  /**
   * Skips Cognito authentication.
   */
  skipAuth?: boolean;
}
export class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string = defaultBaseUrl, options: ApiClientOptions = {}) {
    this.axiosInstance = axios.create({
      baseURL,
    });

    if (!options.skipAuth) {
      this.axiosInstance.interceptors.request.use(async (config) => {
        try {
          const modifiedConfig = config;
          const session = await Auth.currentSession();
          const jwt = session.getIdToken().getJwtToken();
          modifiedConfig.headers.Authorization = `Bearer ${jwt}`;
          return modifiedConfig;
        } catch (error) {
          return config;
        }
      });
    }
  }

  private async get(path: string): Promise<unknown> {
    return this.axiosInstance.get(path).then((response) => response.data);
  }

  private async post(path: string, body: unknown): Promise<unknown> {
    return this.axiosInstance.post(path, body).then((response) => response.data);
  }

  private async patch(path: string, body: unknown): Promise<unknown> {
    return this.axiosInstance.patch(path, body).then((response) => response.data);
  }

  public async getHello(): Promise<string> {
    return this.get('/') as Promise<string>;
  }

  public async getMe(): Promise<User> {
    return this.get('/auth/me') as Promise<User>;
  }

  public async createUser(
    firstName: string,
    lastName: string,
    email: string,
    role: Role,
    createdDate: Date,
  ): Promise<User> {
    return this.post('/user', { firstName, lastName, email, role, createdDate }) as Promise<User>;
  }

  public async getAdmins(): Promise<User[]> {
    return this.get('/user') as Promise<User[]>;
  }

  public async getSurveyData(surveyUuid: string, reviewerUuid: string): Promise<SurveyData> {
    return this.get(`/survey/${surveyUuid}/${reviewerUuid}`) as Promise<SurveyData>;
  }

  public async getSurvey(surveyUuid: string | undefined): Promise<Survey> {
    if (!surveyUuid) {
      throw new Error('Survey UUID is required to fetch survey.');
    }
    return this.get(`/survey/${surveyUuid}`) as Promise<Survey>;
  }

  public async getMySurveys(): Promise<Survey[]> {
    const surveys = await this.get('/survey');
    return surveysSchema.parse(surveys) as Survey[];
  }

  public async getMySurveyTemplates(): Promise<SurveyTemplateData[]> {
    const surveytemplates = await this.get('/survey-template');
    return surveyTemplatesSchema.parse(surveytemplates) as SurveyTemplateData[];
  }

  public async completeAssignment(assignmentUuid: string, responses: Response[]): Promise<void> {
    this.post(`/assignment/${assignmentUuid}`, { responses }).catch((BadRequestException) => {
      throw BadRequestException;
    });
  }

  public async startAssignment(assignmentUuid: string): Promise<void> {
    return this.patch(`/assignment/${assignmentUuid}`, null) as Promise<void>;
  }

  public async getPreviewLetter(assignmentUuid: string, responses: Response[]): Promise<Letter> {
    return this.post(`/assignment/preview-letter/${assignmentUuid}`, {
      responses,
    }) as Promise<Letter>;
  }

  public async getAssignmentResponse(assignmentUuid: string): Promise<ResponseInfo> {
    return this.get(`/assignment/${assignmentUuid}/responses`) as Promise<ResponseInfo>;
  }

  public async getSurveyAssignments(surveyUuid: string | undefined): Promise<SurveyDetail> {
    if (!surveyUuid) {
      throw new Error('Survey UUID is required to fetch survey details.');
    }
    return this.get(`/survey/${surveyUuid}/assignments`) as Promise<SurveyDetail>;
  }

  public async createSurvey(
    name: string,
    surveyTemplateId: number,
    organizationName: string,
    imageBase64: string,
    treatmentPercentage: number,
  ): Promise<Survey> {
    return this.post(`/survey`, {
      name,
      surveyTemplateId,
      organizationName,
      imageBase64,
      treatmentPercentage,
    }) as Promise<Survey>;
  }

  public async createBatchAssignments(
    surveyUUID: string,
    pairs: { youth: PersonInfo; reviewer: PersonInfo }[],
  ): Promise<void> {
    return this.patch(`/survey`, { surveyUUID, pairs }) as Promise<void>;
  }

  public async editSurveyName(surveyUuid?: string, newName?: string): Promise<void> {
    return this.patch(`/survey/${surveyUuid}`, { surveyName: newName }) as Promise<void>;
  }

  public async editSurvey(
    surveyUuid?: string,
    newName?: string,
    newOrgName?: string,
    newImage?: string,
    newPercentage?: number,
  ): Promise<void> {
    return this.patch(`/survey/${surveyUuid}`, {
      surveyName: newName,
      organizationName: newOrgName,
      imageData: newImage,
      treatmentPercentage: newPercentage,
    }) as Promise<void>;
  }

  public async updateReviewerContact(
    reviewerUuid: string,
    email?: string,
    phoneNumber?: string,
  ): Promise<void> {
    return this.patch(`/reviewer/${reviewerUuid}`, {
      secondaryEmail: email,
      phone: phoneNumber,
    }) as Promise<void>;
  }
}

export default new ApiClient();
