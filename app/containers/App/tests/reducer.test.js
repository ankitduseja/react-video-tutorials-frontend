import expect from 'expect';
import appReducer from '../reducer';
// import {} from '../actions';
import { fromJS } from 'immutable';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      userName: null,
      userPass: null,
      sessionState: 'loginInit',
      sessionUser: null,
      sessionId: null,
      snackBarStatus: false,
      snackBarMessage: '',
      cookieLoad: false,
    });
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(appReducer(undefined, {})).toEqual(expectedResult);
  });

});
