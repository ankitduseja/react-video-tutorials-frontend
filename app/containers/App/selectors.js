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
  selectLocationState,

  selectUserName,
  selectUserPass,
  selectSessionId,
};
