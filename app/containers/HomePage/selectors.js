/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';

const selectHome = () => (state) => state.get('home');

const selectUsername = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('username')
);

const selectUserName = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('userName')
);

const selectUserPass = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('userPass')
);

const selectSessionId = () => createSelector(
  selectHome(),
  (homeState) => homeState.get('sessionId')
);

export {
  selectHome,
  selectUsername,
  selectUserName,
  selectUserPass,
  selectSessionId,
};
