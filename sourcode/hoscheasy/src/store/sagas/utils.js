import { all, takeLatest, call } from 'redux-saga/effects';
import {
  checkPermission,
  requestPermision,
  checkTurnOnLocationService,
  openSetting,
  getCurrentLocation
} from 'Root/src/utils/LocationHelper';
import { isIOS } from 'Root/src/utils/iPhoneXHelper';
import { UTILS_GET_LOCATION } from '../type';

function* requestLocationSaga(actions) {
  const { callBack } = actions;
  console.log('Callback', callBack);
  try {
    const hasPermission = yield call(checkPermission);
    const turnOnService = yield call(checkTurnOnLocationService);
    console.log('hasPermission requestLocationSaga ==> ', hasPermission);
    console.log('turnOnService requestLocationSaga ==> ', turnOnService);
    if (!hasPermission) {
      console.log('1')
      const requested = yield call(requestPermision);
      console.log('requested requestLocationSaga ==> ', requested);
      if (isIOS && requested === 'denied') {
        const opened = yield call(openSetting);
        if (!opened) return;
      }
      if (!requested) return;
    }
    if (!turnOnService) {
      console.log('2')
      const opened = yield call(openSetting);
      if (!opened) return;
    }
    console.log('here')
    const result = yield call(getCurrentLocation, false);
    if (!result) return;
    if (callBack) return callBack(result);
  } catch (error) {
    console.log('error requestLocationSaga ==> ', error);
    if (callBack) return callBack(null, error.toString());
  }
}

export default [
  function* fetchWatcher() {
    yield all([takeLatest(UTILS_GET_LOCATION, requestLocationSaga)]);
  }
];
