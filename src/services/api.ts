import { BaseService } from './BaseService';

class API extends BaseService {
  async getWeathers() {
    const { data } = await this.client({
      params: {},
    });
    return data;
  }
}

export const api = new API({ baseURL: process.env.REACT_APP_API_BASE_URL });
