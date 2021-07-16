import axios from 'axios';

const defaultBaseUrl = process.env.API_BASE_URL ?? 'http://localhost:5000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = defaultBaseUrl) {
    this.baseUrl = baseUrl;
  }

  public async getHello(): Promise<string> {
    return axios.get(`${this.baseUrl}/`).then((response) => response.data);
  }
}

export default ApiClient;
