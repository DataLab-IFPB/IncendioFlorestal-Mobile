export const IndiceSchema = {
  name: 'Indice',
  primaryKey: 'id',
  properties: {
    id: 'int',
    latitude: 'double',
    longitude: 'double',
    ativo: { type: 'bool', default: true },
    userCreated: { type: 'bool', default: true },
    brightness: { type: 'int' },
    brightness_2: { type: 'int' },
    confidence: { type: 'bool', default: true },
    daynight: 'string',
    frp: { type: 'int', optional: true },
    point: 'double[]',
    satellite: 'string',
    scan: { type: 'string' },
    track: { type: 'string' },
    acq_datetime: { type: 'string', default: '' },
    acq_time: { type: 'string', default: '' },
    acq_date: { type: 'string', default: '' },

    version: 'int',

    temperature: 'Temperature',
  },
};
