import { createSelector } from 'reselect';
import {selectGlobal} from 'containers/App/selectors';
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

const selectVideoPages = () => createSelector(
  selectVideoPageDomain(),
  (substate) => {substate}
);

const selectVideoPage = () => createSelector(
  [selectGlobal(),selectVideoPageDomain()],
  (app,substate) => {
    return {app:app.toJS(),videopage:substate.toJS()}
  }
);

export default selectVideoPage;
export {
  selectVideoPageDomain,
};
