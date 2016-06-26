import { createSelector } from 'reselect';
import {selectHome} from 'containers/HomePage/selectors';

import {selectGlobal} from 'containers/App/selectors';
/**
 * Direct selector to the videoList state domain
 */
const selectVideoListDomain = () => state => state.get('videoList');

/**
 * Other specific selectors
 */


/**
 * Default selector used by VideoList
 */

const selectVideoList = () => createSelector(
  [selectGlobal(),selectVideoListDomain(), selectHome()],
  (app,videoList,home) => {
    return {
      app:app.toJS(),
      videolist:videoList.toJS(),
      homepage:home.toJS(),
    }
  }
);

export default selectVideoList;
export {
  selectVideoListDomain,
};
