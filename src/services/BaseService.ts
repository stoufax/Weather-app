import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Base class for REST services.
 */
export class BaseService {
  protected client: AxiosInstance;

  constructor(private config: AxiosRequestConfig) {
    this.client = axios.create(this.config);
  }
}
