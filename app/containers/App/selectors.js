/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = () => (state) => state.get('global');

const selectApp = () => createSelector(
  [selectGlobal()],
  (app) => {
    return {
      app:app.toJS(),
    }
  }
);

const selectCurrentUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('currentUser')
);

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading')
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error')
);

const selectRepos = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const selectUserName = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('userName')
);

const selectUserPass = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('userPass')
);

const selectSessionId = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('sessionId')
);


const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export {
  selectGlobal,
  selectApp,
  selectCurrentUser,
  selectLoading,
  selectError,
  selectRepos,
  selectLocationState,

  selectUserName,
  selectUserPass,
  selectSessionId,
};
