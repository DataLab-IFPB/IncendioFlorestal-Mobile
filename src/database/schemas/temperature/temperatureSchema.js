export const TemperatureScheme = {
  name: 'Temperature',
  primaryKey: 'id',
  properties: {
    id: 'int',
    temp_c: { type: 'double', default: 0, optional: true },
    humidity: { type: 'double', default: 0, optional: true },
    wind_kph: { type: 'double', default: 0, optional: true },
    locale: { type: 'string', default: '', optional: true },
    precip_in: { type: 'double', default: 0, optional: true },
  },
};
