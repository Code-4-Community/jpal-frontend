import { Auth } from 'aws-amplify';
import axios, { AxiosInstance } from 'axios';
import { Response, SurveyData } from './dtos/survey-assignment.dto';
import Role from './dtos/role';
import User from './dtos/user.dto';
import DEFAULT_QUESTIONS from '../components/survey/defaultQuestions';

const defaultBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:5000';
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

  public async createUser(email: string, role: Role): Promise<User> {
    return this.post('/user', { email, role }) as Promise<User>;
  }

  public async getAdmins(): Promise<User[]> {
    return this.get('/user') as Promise<User[]>;
  }

  // eslint-disable-next-line class-methods-use-this
  public getSurvey(_surveyUuid: string, _reviewerUuid: string): SurveyData {
    // return this.get(`/survey/${surveyUuid}/${reviewerUuid}`) as Promise<SurveyData>;
    return {
      reviewer: {
        email: 'c4cneu.jpal+ben.lerner@gmail.com',
        firstName: 'Ben',
        lastName: 'Lerner',
      },
      controlYouth: [
        {
          email: 'c4cneu.jpal+joe.shmoe@gmail.com',
          firstName: 'Joe',
          lastName: 'Shmoe',
          assignmentUuid: 'demo-assignment-uuid-joe',
        },
        {
          email: 'c4cneu.jpal+nash.ville@gmail.com',
          firstName: 'Nash',
          lastName: 'Ville',
          assignmentUuid: 'demo-assignment-uuid-nash',
        },
        {
          email: 'c4cneu.jpal+jane.doe@gmail.com',
          firstName: 'Jane',
          lastName: 'Doe',
          assignmentUuid: 'demo-assignment-uuid-jane',
        },
      ],
      treatmentYouth: [
        {
          email: 'c4cneu.jpal+ada.lovelace@gmail.com',
          firstName: 'Ada',
          lastName: 'Lovelace',
          assignmentUuid: 'demo-assignment-uuid-ada',
        },
        {
          email: 'c4cneu.jpal+alan.turing@gmail.com',
          firstName: 'Alan',
          lastName: 'Turing',
          assignmentUuid: 'demo-assignment-uuid-alan',
        },
        {
          email: 'c4cneu.jpal+george.washington@gmail.com',
          firstName: 'George',
          lastName: 'Washington',
          assignmentUuid: 'demo-assignment-uuid-george',
        },
      ],
      questions: DEFAULT_QUESTIONS,
    };
  }

  // Stubbed out for now. Not implemented on the backend.
  public async completeAssignment(assignmentUuid: string, responses: Response[]): Promise<void> {
    this.patch(`/assignment/${assignmentUuid}`, { responses }).catch(() => undefined);
  }
}

export default new ApiClient();
