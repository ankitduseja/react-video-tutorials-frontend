/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import * as C from './constants';
import cookie from 'react-cookie';

/**
 * Send Login Requst
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function userLogin(data) {
  return {
    type: C.USER_LOGIN,
    data,
  };
}

/**
 * Send Login Requst
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function checkCookie() {
  var sessionUser=cookie.load('sessionUser');
  var sessionId=cookie.load('sessionId');
  if(sessionUser!='undefined' && sessionId!='undefined') {
    var data={
      sessionId,
      sessionUser,
    }
    return {
      type: C.USER_COOKIE_SUCCESS,
      data,
    };
  } else {
    return {
      type: C.USER_COOKIE_FAILURE,
    };
  }
}

/**
 * Send Logout Request
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function userLogout() {
  return {
    type: C.USER_LOGOUT,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function loginSuccess(data) {
  return {
    type: C.USER_LOGIN_SUCCESS,
    data,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function loginFailure(data) {
  return {
    type: C.USER_LOGIN_FAILURE,
    data,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function logoutSuccess() {
  return {
    type: C.USER_LOGOUT_SUCCESS,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function logoutFailure() {
  return {
    type: C.USER_LOGOUT_FAILURE,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function openSnackBar(message) {
  return {
    type: C.SNACKBAR_OPEN,
    message,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function closeSnackBar() {
  return {
    type: C.SNACKBAR_CLOSE,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function videoRate(data) {
  return {
    type: C.VIDEO_RATE,
    data,
  };
}

/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function videoRateSuccess(data) {
  return {
    type: C.VIDEO_RATE_SUCCESS,
    data,
  };
}
/**
 *
 *
 * @param  {}
 *
 * @return {object}    An action object with a type of
 */
export function videoRateFailure(data) {
  return {
    type: C.VIDEO_RATE_FAILURE,
    data,
  };
}
