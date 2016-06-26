import expect from 'expect';
import videoListReducer from '../reducer';
import { fromJS } from 'immutable';

describe('videoListReducer', () => {
  it('returns the initial state', () => {
    expect(videoListReducer(undefined, {})).toEqual(fromJS({}));
  });
});
