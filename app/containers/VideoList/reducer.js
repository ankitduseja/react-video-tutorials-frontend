/*
 *
 * VideoList reducer
 *
 */

import { fromJS } from 'immutable';
import * as C from './constants';

const initialState = fromJS({
  videoList:[],
  videoPlaying: null,
  lazypage:0,
  lazyloading: false,
});

function videoListReducer(state = initialState, action) {
  switch (action.type) {
    case C.FETCH_VIDEOS:
      return state
        .set('lazyloading',true);
    case C.VIDEOS_FETCH_SUCCESS:
      var s=state;
      if (typeof action==='object' && typeof action.data==='object') {
        var a=s.get('videoList');
        a=a.push(...action.data);
        s=s.set('videoList',a);
        var lazypage=s.get('lazypage');
        s=s.set('lazypage',++lazypage);
      }
      s=s.set('lazyloading',false);
      return s;
    case C.VIDEOS_FETCH_FAILURE:
      return state
        .set('lazyloading',false);
    default:
      return state;
  }
}

export default videoListReducer;
