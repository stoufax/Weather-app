export type TemperatureUnits = 'fahrenheit' | 'celsius';

export interface WeatherInfoType {
  temp: number;
  date: string;
  key: string;
}
