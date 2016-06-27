/*
 *
 * VideoPage reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

const initialState = fromJS({
  video: null,
  loading: 'idle',
  loaded: false,
});

function videoPageReducer(state = initialState, action) {
  switch (action.type) {
    case C.VIDEO_FETCH:
      return state
        .set('loading',true);
    case C.VIDEO_FETCH_SUCCESS:
      var s=state;
      if (typeof action==='object' && typeof action.data==='object') {
        s=s.set('video',action.data);
        s=s.set('loading','success');
        s=s.set('loaded',true);
      }
      return s;
    case C.VIDEOS_FETCH_FAILURE:
      return state
        .set('loading','fail');
    default:
      return state;
  }
}

export default videoPageReducer;
