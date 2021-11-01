import getRealm from './realm';

export async function saveIndiceLocal(indice) {
  const realm = await getRealm();

  const nextId = realm.objects('Indice').length + 1;

  return new Promise((resolve) => {
    realm.write(() => {
      const indiceSaved = realm.create('Indice', {
        id: nextId,
        ...indice,
      });

      resolve(indiceSaved);
    });
  });
}

export async function saveTemperatureLocal(temperature) {
  const realm = await getRealm();
  const nextId = realm.objects('Temperature').length + 1;

  return new Promise((resolve) => {
    realm.write(() => {
      const temperatureSaved = realm.create('Temperature', {
        id: nextId,
        ...temperature,
      });

      resolve(temperatureSaved);
    });
  });
}

export function getIndicesLocal() {
  return new Promise((resolve) => {
    const realm = getRealm();
    const indices = realm.objects('Indice');
    resolve(indices);
  });
}

export function getTemperaturesLocal() {
  return new Promise((resolve) => {
    const realm = getRealm();
    const temperatures = realm.objects('Temperature');
    resolve(temperatures);
  });
}
