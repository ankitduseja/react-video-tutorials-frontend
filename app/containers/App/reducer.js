/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import * as C from './constants';
import { fromJS } from 'immutable';
import cookie from 'react-cookie';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: fromJS({
    repositories: false,
  }),
  userName: null,
  userPass: null,
  sessionState: 'loginInit',
  sessionUser: null,
  sessionId: null,
  snackBarStatus: false,
  snackBarMessage: '',
  cookieLoad: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case C.LOAD_REPOS:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'repositories'], false);
    case C.LOAD_REPOS_SUCCESS:
      return state
        .setIn(['userData', 'repositories'], action.repos)
        .set('loading', false)
        .set('currentUser', action.username);
    case C.LOAD_REPOS_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case C.SNACKBAR_OPEN:
      return state
        .set('snackBarMessage',action.message)
        .set('snackBarStatus',true);
    case C.SNACKBAR_CLOSE:
      return state
        .set('snackBarMessage','')
        .set('snackBarStatus',false);
    case C.USER_LOGIN:
      return state
        .set('sessionState','loginTry')
        .set('userName', action.data.userName)
        .set('userPass', action.data.userPass);
    case C.USER_COOKIE_SUCCESS:
      cookie.save('sessionUser', action.data.sessionUser, { path: '/' });
      cookie.save('sessionId', action.data.sessionId, { path: '/' });
      return state
        .set('cookieLoad',true)
        .set('sessionState','loginSuccessFromCookie')
        .set('sessionUser',action.data.username)
        .set('sessionId',action.data.sessionId);
    case C.USER_COOKIE_FAILURE:
      return state
        .set('cookieLoad',true)
        .set('sessionState','loginFailureFromCookie');
    case C.USER_LOGIN_SUCCESS:
      cookie.save('sessionUser', action.data.username, { path: '/' });
      cookie.save('sessionId', action.data.sessionId, { path: '/' });
      return state
        .set('sessionState','loginSuccess')
        .set('sessionUser',action.data.username)
        .set('sessionId',action.data.sessionId)
        .set('userName', null)
        .set('userPass', null);
    case C.USER_LOGIN_FAILURE:
      return state
        .set('sessionState','loginFailure')
        .set('userName', null)
        .set('userPass', null);
    case C.USER_LOGOUT:
      cookie.remove('sessionUser', { path: '/' });
      cookie.remove('sessionId', { path: '/' });
      /** Clear all cookies starting with 'session' (to get all cookies, omit regex argument) */
      Object.keys(cookie.select(/^session.*/i)).forEach(name => cookie.remove(name, { path: '/' }))
      return state
        .set('sessionState','logoutTry');
    case C.USER_LOGOUT_SUCCESS:
      return state
        .set('sessionState','logoutSuccess')
        .set('sessionUser',null)
        .set('sessionId',null);
    case C.USER_LOGOUT_FAILURE:
      return state
        .set('sessionState','logoutFailure')
        .set('sessionUser',null)
        .set('sessionId',null);
    default:
      return state;
  }
}

export default homeReducer;
