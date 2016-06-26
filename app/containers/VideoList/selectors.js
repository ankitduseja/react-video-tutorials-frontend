import { createSelector } from 'reselect';
import {selectHome} from 'containers/HomePage/selectors';
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
  [selectVideoListDomain(), selectHome()],
  (videoList,home) => {
    return {
      videolist:videoList.toJS(),
      homepage:home.toJS(),
    }
  }
);

export default selectVideoList;
export {
  selectVideoListDomain,
};
