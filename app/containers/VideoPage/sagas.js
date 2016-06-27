import { take, call, put, select, race } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import config from '../../config.js';
import request from 'utils/request';

import * as C from './constants';
import * as actions from 'containers/VideoPage/actions';
import {logoutUserSaga, rateVideo} from 'containers/App/sagas';
// import { openSnackBar } from 'containers/HomePage/actions';
import { selectSessionId } from 'containers/App/selectors';

// All sagas to be loaded
export default [
  loadVideo,logoutUserSaga,rateVideo
];

// Individual exports for testing
export function* defaultSaga() {

}

// Individual exports for testing
export function* loadVideo() {
  while (true) {
    const watcher = yield race({
      loadVideo: take(C.VIDEO_FETCH),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) break;
    // yield put(openSnackBar('Loading Video...'));
    const sessionId = yield select(selectSessionId());

    var options=watcher.loadVideo.options;
    var videoId=options.videoId;
    const requestURL = config.backendDomain+`/video?sessionId=${sessionId}&videoId=${videoId}`;
    // Use call from redux-saga for easier testing
    console.log('requesting:'+requestURL);
    const repos = yield call(request, requestURL);
    // We return an object in a specific format, see utils/request.js for more information
    if ((repos.err === undefined || repos.err === null) && typeof repos.data==='object' && repos.data.status==='success') {
      // yield put(openSnackBar('Video Loaded!'));
      yield put(actions.fetchVideoSuccess(repos.data.data));
    } else {
      // yield put(openSnackBar('Unable to load video!'));
      yield put(actions.fetchVideoFailure(repos.data));
    }
  }
}
