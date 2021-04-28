import { mockData } from './helpers.mock';

import { averageTemperature, convertTemperatureValueByUnit } from 'utils/helpers';

describe('Helpers', () => {
  describe('averageTemperature', () => {
    it('should return a average of list of number', () => {
      const average = averageTemperature(mockData);
      expect(average).toBe(277);
    });
  });
  describe('convertTemperatureValueByUnit', () => {
    it('should convert temperature from kelvin to celsius', () => {
      const temp = convertTemperatureValueByUnit(300, 'celsius');
      expect(temp).toBe(27);
    });

    it('should convert temperature from kelvin to fahrenheit', () => {
      const temp = convertTemperatureValueByUnit(300, 'fahrenheit');
      expect(temp).toBe(80);
    });
    it('should return the same valeu when the unit is not provided', () => {
      const temp = convertTemperatureValueByUnit(300);
      expect(temp).toBe(300);
    });
  });
});
