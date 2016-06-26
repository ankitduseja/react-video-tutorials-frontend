/*
 *
 * VideoPage actions
 *
 */

import * as C from './constants';

export function fetchVideo(options) {
  return {
    type: C.VIDEO_FETCH,
    options,
  };
}

export function fetchVideoSuccess(data) {
  return {
    type: C.VIDEO_FETCH_SUCCESS,
    data,
  };
}

export function fetchVideoFailure(data) {
  return {
    type: C.VIDEO_FETCH_FAILURE,
    data,
  };
}
