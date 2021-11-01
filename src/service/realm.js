import Realm from 'realm';
import { IndiceSchema } from '../database/schemas/indices/indiceScheme';
import { TemperatureScheme } from '../database/schemas/temperature/temperatureSchema';

export default async function getRealm() {
  return await Realm.open({
    schema: [IndiceSchema, TemperatureScheme],
  });
}
