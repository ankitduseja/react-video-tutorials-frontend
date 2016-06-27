import expect from 'expect';
import videoPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('videoPageReducer', () => {
    let state={};
    beforeEach(() => {
      state = fromJS({
        video: null,
        loading: 'fail',
        loaded: false,
      });
    });
  it('returns the initial state', () => {
    const expectedResult = state;
    expect(videoPageReducer(undefined, {})).toEqual(expectedResult);
  });
});
