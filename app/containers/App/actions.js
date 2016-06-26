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

/**
 * Load the repositories, this action starts the getGithubData saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function loadRepos() {
  return {
    type: C.LOAD_REPOS,
  };
}

/**
 * Dispatched when the repositories are loaded by the getGithubData saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: C.LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_REPOS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: C.LOAD_REPOS_ERROR,
    error,
  };
}


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
