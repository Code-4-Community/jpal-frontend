import { Auth } from 'aws-amplify';
import axios, { AxiosInstance } from 'axios';
import { Letter } from './dtos/letter';
import Role from './dtos/role';
import { Response, Survey, SurveyData, surveysSchema } from './dtos/survey-assignment.dto';
import User from './dtos/user.dto';

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
  ): Promise<User> {
    return this.post('/user', { firstName, lastName, email, role }) as Promise<User>;
  }

  public async getAdmins(): Promise<User[]> {
    return this.get('/user') as Promise<User[]>;
  }

  public async getSurvey(surveyUuid: string, reviewerUuid: string): Promise<SurveyData> {
    return this.get(`/survey/${surveyUuid}/${reviewerUuid}`) as Promise<SurveyData>;
  }

  public async getMySurveys(): Promise<Survey[]> {
    const surveys = await this.get('/survey');
    return surveysSchema.parse(surveys) as Survey[];
  }

  // Stubbed out for now. Not implemented on the backend.
  public async completeAssignment(assignmentUuid: string, responses: Response[]): Promise<void> {
    this.post(`/assignment/${assignmentUuid}`, { responses }).catch((BadRequestException) => {
      throw BadRequestException;
    });
  }

  public async startAssignment(assignmentUuid: string): Promise<void> {
    this.patch(`/assignment/${assignmentUuid}`, null).catch((BadRequestException) => {
      throw BadRequestException;
    });
  }

  public async getPreviewLetter(assignmentUuid: string, responses: Response[]): Promise<Letter> {
    return this.post(`/assignment/preview-letter/${assignmentUuid}`, {
      responses,
    }) as Promise<Letter>;
  }
}

export default new ApiClient();
