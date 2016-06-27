import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import config from '../../config.js'
import request from 'utils/request';

import * as C from './constants';
import * as actions from 'containers/VideoList/actions';
import { openSnackBar,closeSnackBar } from 'containers/App/actions';
import { selectSessionId } from 'containers/App/selectors';

// All sagas to be loaded
export default [
  loadVideos,
];

// Individual exports for testing
export function* defaultSaga() {

}

// Individual exports for testing
export function* loadVideos() {
  while (true) {
    const watcher = yield race({
      loadVideos: take(C.VIDEOS_FETCH),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) {
      break;
    }
    yield put(openSnackBar('Loading Videos...'));
    const sessionId = yield select(selectSessionId());

    let skip=0,limit=10;
    var options=watcher.loadVideos.options;
    if (typeof options!=='undefined') {
      if(typeof options.skip==='number') {
        skip=options.skip;
      }
      if(typeof options.limit==='number') {
        limit=options.limit;
      }
    }
    const requestURL = config.backendDomain+`/videos?sessionId=${sessionId}&skip=${skip}&limit=${limit}`;
    // Use call from redux-saga for easier testing
    console.log('requesting:'+requestURL);
    const repos = yield call(request, requestURL);
    // We return an object in a specific format, see utils/request.js for more information
    if ((repos.err === undefined || repos.err === null) && typeof repos.data==='object' && repos.data.status==='success') {
      yield put(closeSnackBar());
      yield put(actions.fetchVideosSuccess(repos.data.data));
    } else {
      yield put(openSnackBar('Unable to load videos!'));
      yield put(actions.fetchVideosFailure(repos.data));
    }
  }
}
