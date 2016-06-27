import expect from 'expect';
import videoListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('videoListReducer', () => {
  let state={};
  beforeEach(() => {
    state = fromJS({
      videoList:[],
      videoPlaying: null,
      lazypage:0,
      lazyloading: false,
    });
  });
  
  it('returns the initial state', () => {
    const expectedResult = state;
    expect(videoListReducer(undefined, {})).toEqual(expectedResult);
  });
});
