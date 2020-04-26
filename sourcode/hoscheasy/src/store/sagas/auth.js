import { put, all, takeLatest, select } from "redux-saga/effects";
import { startSingleScreen } from "Root";
import { destroy } from "redux-form";
import firebase from "react-native-firebase";
import { AUTH_CLEAR, AUTH_LOGOUT } from "../type";

function* logout() {
  const profile = yield select(_ => _.auth.profile);
  const locale = yield select(_ => _.locale);
  profile &&
    profile?.accountId &&
    firebase
      .messaging()
      .unsubscribeFromTopic(
        `cse_${profile.accountId}_${locale === "en_MM" ? "my" : locale}`
      );
  yield put({ type: AUTH_CLEAR });
  // yield put(destroy(['login']));
  startSingleScreen();
}

export default [
  function* fetchWatcher() {
    yield all([takeLatest(AUTH_LOGOUT, logout)]);
  }
];
