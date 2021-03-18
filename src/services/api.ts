import { BaseService } from './BaseService';

class API extends BaseService {}

export const api = new API({ baseURL: process.env.REACT_APP_API_BASE_URL });
