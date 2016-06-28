/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from 'containers/App/constants';
import * as AppC from 'containers/App/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
// import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from 'containers/HomePage/actions';
import * as AppActions from 'containers/App/actions';

import request from 'utils/request';
import { objToFormBody } from 'utils/request';
import { selectUsername } from 'containers/HomePage/selectors';
import { selectUserName, selectUserPass, selectSessionId } from 'containers/App/selectors';
import md5 from 'md5';
import config from '../../config.js'


// Individual exports for testing
export function* loginUserSaga() {
  while (true) {
    const watcher = yield race({
      userLogin: take(AppC.USER_LOGIN),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) break;
    yield put(AppActions.openSnackBar('Logging In...'));

    const requestURL = config.backendDomain+`/user/auth`;
    let postdata={};
    postdata.username = yield select(selectUserName());
    const userpass = yield select(selectUserPass());
    postdata.password = md5(userpass);
    const formbody=objToFormBody(postdata);
    const requestOptions={
      method: 'POST',
      contentType:"application/x-www-form-urlencoded",
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: formbody,
      cache: false
    };
    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL, requestOptions);
    // We return an object in a specific format, see utils/request.js for more information
    if ((repos.err === undefined || repos.err === null) && typeof repos.data==='object' && repos.data.status==='success') {
      yield put(AppActions.openSnackBar('Logged In!'));
      yield put(AppActions.loginSuccess(repos.data));
    } else {
      console.log(repos); // eslint-disable-line no-console
      var errormsg='Login Failed';
      if(repos.data && typeof repos.data.error==='string') {
        errormsg+=': '+repos.data.error;
      }
      yield put(AppActions.openSnackBar(errormsg));
      yield put(AppActions.loginFailure(repos.data));
    }
  }
}

// Individual exports for testing
export function* logoutUserSaga() {
  while (true) {
    const watcher = yield race({
      loadRepos: take(AppC.USER_LOGOUT),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) break;
    yield put(AppActions.openSnackBar('Logging Out...'));
    const sessionId = yield select(selectSessionId());
    const requestURL = config.backendDomain+`/user/logout?sessionId=${sessionId}`;

    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL);

    // We return an object in a specific format, see utils/request.js for more information
    if ((repos.err === undefined || repos.err === null) && typeof repos.data==='object' && repos.data.status==='success') {
      yield put(AppActions.logoutSuccess(repos.data));
      yield put(AppActions.openSnackBar('Logged Out Succesfully!'));
    } else {
      console.log(repos); // eslint-disable-line no-console
      var errormsg='Logout Failed';
      if(repos.data && typeof repos.data.error==='string') {
        errormsg+=': '+repos.data.error;
      }
      yield put(AppActions.openSnackBar(errormsg));
      yield put(AppActions.logoutFailure(repos.data));
    }
  }
}

// Individual exports for testing
export function* rateVideo() {
  while (true) {
    const watcher = yield race({
      rateVideo: take(AppC.VIDEO_RATE),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) break;

    yield put(AppActions.openSnackBar('Recording your rating...'));

    const sessionId = yield select(selectSessionId());
    const requestURL = config.backendDomain+`/video/ratings?sessionId=${sessionId}`;
    let postdata=watcher.rateVideo.data;
    const formbody=objToFormBody(postdata);
    const requestOptions={
      method: 'POST',
      contentType:"application/x-www-form-urlencoded",
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: formbody,
      cache: false
    };
    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL, requestOptions);
    // We return an object in a specific format, see utils/request.js for more information
    if ((repos.err === undefined || repos.err === null) && typeof repos.data==='object' && repos.data.status==='success') {
      yield put(AppActions.openSnackBar('Rating Recorded!'));
      yield put(AppActions.videoRateSuccess(repos.data));
    } else {
      console.log(repos); // eslint-disable-line no-console
      var errormsg='Rating Failed';
      if(repos.data && typeof repos.data.error==='string') {
        errormsg+=': '+repos.data.error;
      }
      yield put(AppActions.openSnackBar(errormsg));
      yield put(AppActions.videoRateFailure(repos.data));
    }
  }
}
