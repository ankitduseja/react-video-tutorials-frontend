import expect from 'expect';
import videoPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('videoPageReducer', () => {
  it('returns the initial state', () => {
    expect(videoPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
