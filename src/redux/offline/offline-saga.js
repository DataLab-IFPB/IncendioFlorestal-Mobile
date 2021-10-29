import { ONLINE, OFFLINE } from 'redux-offline-queue';

import NetInfo from '@react-native-community/netinfo';
import { put, take, call } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

function* startWatchingNetworkConnectivity() {
  const channel = eventChannel((emitter) => {
    NetInfo.isConnected.addEventListener('connectionChange', emitter);
    return () =>
      NetInfo.isConnected.removeEventListener('connectionChange', emitter);
  });
  try {
    while (true) {
      const isConnected = yield take(channel);
      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}
