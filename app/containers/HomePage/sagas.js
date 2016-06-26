/**
 * Gets the repositories of the user from Github
 */

/* eslint-disable no-constant-condition */

import { take, call, put, select, race } from 'redux-saga/effects';

import { LOCATION_CHANGE } from 'react-router-redux';

import { LOAD_REPOS } from 'containers/App/constants';
import { USER_LOGIN, USER_LOGOUT } from 'containers/HomePage/constants';
import { reposLoaded, repoLoadingError } from 'containers/App/actions';
// import { loginSuccess, loginFailure, logoutSuccess, logoutFailure } from 'containers/HomePage/actions';
import * as actions from 'containers/HomePage/actions';
import * as VideoListSagas from 'containers/VideoList/sagas';

import request from 'utils/request';
import { objToFormBody } from 'utils/request';
import { selectUsername, selectUserName, selectUserPass, selectSessionId } from 'containers/HomePage/selectors';
import md5 from 'md5';
import config from '../../config.js'

// Bootstrap sagas
var d=[
  getGithubData, loginUserSaga, logoutUserSaga
];
d=d.concat(VideoListSagas.default);
export default d;

// Individual exports for testing
export function* getGithubData() {
  while (true) {
    const watcher = yield race({
      loadRepos: take(LOAD_REPOS),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });

    if (watcher.stop) break;

    const username = yield select(selectUsername());
    const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL);

    // We return an object in a specific format, see utils/request.js for more information
    if (repos.err === undefined || repos.err === null) {
      yield put(reposLoaded(repos.data, username));
    } else {
      // console.log(repos.err.response); // eslint-disable-line no-console
      yield put(repoLoadingError(repos.err));
    }
  }
}

// Individual exports for testing
export function* loginUserSaga() {
  while (true) {
    const watcher = yield race({
      userLogin: take(USER_LOGIN),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) break;
    yield put(actions.openSnackBar('Loggin In...'));

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
      yield put(actions.openSnackBar('Logged In!'));
      yield put(actions.loginSuccess(repos.data));
    } else {
      console.log('repo error');
      console.log(repos); // eslint-disable-line no-console
      yield put(actions.openSnackBar('Login Failed: '+repos.data.error));
      yield put(actions.loginFailure(repos.data));
    }
  }
}

// Individual exports for testing
export function* logoutUserSaga() {
  while (true) {
    const watcher = yield race({
      loadRepos: take(USER_LOGOUT),
      stop: take(LOCATION_CHANGE), // stop watching if user leaves page
    });
    if (watcher.stop) break;
    yield put(actions.openSnackBar('Logging Out...'));
    const sessionId = yield select(selectSessionId());
    const requestURL = config.backendDomain+`/user/logout?sessionId=${sessionId}`;

    // Use call from redux-saga for easier testing
    const repos = yield call(request, requestURL);

    // We return an object in a specific format, see utils/request.js for more information
    if ((repos.err === undefined || repos.err === null) && typeof repos.data==='object' && repos.data.status==='success') {
      yield put(actions.logoutSuccess(repos.data));
      yield put(actions.openSnackBar('Logged Out Succesfully!'));
    } else {
      console.log(repos); // eslint-disable-line no-console
      yield put(actions.openSnackBar('Logout Failed: '+repos.data.error));
      yield put(actions.logoutFailure(repos.data));
    }
  }
}
