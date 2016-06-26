/*
 *
 * VideoList actions
 *
 */

import * as C from './constants';

export function fetchVideos(options) {
  return {
    type: C.VIDEOS_FETCH,
    options,
  };
}

export function fetchVideosSuccess(data) {
  return {
    type: C.VIDEOS_FETCH_SUCCESS,
    data,
  };
}

export function fetchVideosFailure(data) {
  return {
    type: C.VIDEOS_FETCH_FAILURE,
    data,
  };
}