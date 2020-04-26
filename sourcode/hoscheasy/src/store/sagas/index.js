import { fork, all } from 'redux-saga/effects';
import auth from './auth';
import utils from './utils';

const rootSaga = function* () {
  yield all([
    ...auth.map(watcher => fork(watcher)),
    ...utils.map(watcher => fork(watcher))
  ]);
};

export default rootSaga;
