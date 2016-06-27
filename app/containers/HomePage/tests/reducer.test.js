import expect from 'expect';
import homeReducer from '../reducer';
import {
  changeUsername,
} from '../actions';
import { fromJS } from 'immutable';

describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });
});
