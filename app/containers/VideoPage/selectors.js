import { createSelector } from 'reselect';

/**
 * Direct selector to the videoPage state domain
 */
const selectVideoPageDomain = () => state => state.get('videoPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by VideoPage
 */

const selectVideoPage = () => createSelector(
  selectVideoPageDomain(),
  (substate) => substate.toJS()
);

export default selectVideoPage;
export {
  selectVideoPageDomain,
};
