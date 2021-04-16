import { AxiosError } from 'axios';
import { useQuery } from 'react-query';

import { api } from './api';

interface weatherResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<any>;
}

export const useGetWeathers = () => useQuery<weatherResponse, AxiosError>('weather', () => api.getWeathers());
