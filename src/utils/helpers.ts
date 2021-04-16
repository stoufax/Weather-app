import _ from 'lodash';

import { TemperatureUnits } from 'typings';

export function convertTemperatureValueByUnit(value: number, unit?: TemperatureUnits): number {
  if (unit === 'celsius') return Math.round(value - 273.15);
  if (unit === 'fahrenheit') return Math.round(((value - 273.15) * 9) / 5 + 32);
  return value;
}

export function averageTemperature(data: Array<any>): number {
  const mappedTemp = data.map((d) => d.main.temp);
  return _.round(_.sum(mappedTemp) / mappedTemp.length);
}
