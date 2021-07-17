import { call, put, takeLatest } from '@redux-saga/core/effects';
import {
  fetchIndicesIncendiosSuccess,
  fetchIndicesIncendiosFail,
} from './indices-incendios-action';
import csvtojson from 'csvtojson';

import { FETCH_INDICES_INCENDIOS } from './indices-incendios-types';
import axios from 'axios';

const URL_VIIRS_S_NPP =
  'https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/South_America/4537fd5fa15456faf3b61a8f9307a296/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_snpp_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv';

const URL_MODIS =
  'https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/South_America/4537fd5fa15456faf3b61a8f9307a296/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_modis_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv';

const URL_VIIRS_NOAA_20 =
  'https://firms.modaps.eosdis.nasa.gov/mapserver/wfs/South_America/4537fd5fa15456faf3b61a8f9307a296/?SERVICE=WFS&REQUEST=GetFeature&VERSION=2.0.0&TYPENAME=ms:fires_noaa20_24hrs&STARTINDEX=0&COUNT=1000&SRSNAME=urn:ogc:def:crs:EPSG::4326&BBOX=-90,-180,90,180,urn:ogc:def:crs:EPSG::4326&outputformat=csv';
const _getData = (data) => {
  return csvtojson().fromString(data);
};

function* indicesIncendios() {
  try {
    const { data } = yield call(axios.get, URL_VIIRS_NOAA_20);
    if (data) {
      const result = yield _getData(data);
      yield put(fetchIndicesIncendiosSuccess(result));
    }
  } catch (error) {
    yield put(fetchIndicesIncendiosFail(error));
  }
}

export function* indicesIncendiosSagas() {
  yield takeLatest(FETCH_INDICES_INCENDIOS, indicesIncendios);
}
