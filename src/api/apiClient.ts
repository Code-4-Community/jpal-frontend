import axios from 'axios';

const defaultBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:5000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = defaultBaseUrl) {
    this.baseUrl = baseUrl;
  }

  public async getHello(): Promise<string> {
    return this.get('/') as Promise<string>;
  }

  public async getProfile(): Promise<any> {
    return this.get('/auth/me');
  }

  private get(path: string): Promise<unknown> {
    return axios.get(`${this.baseUrl}${path}`).then((response) => response.data);
  }
}

export default ApiClient;
