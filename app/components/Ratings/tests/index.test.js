import Ratings from '../index';

import expect from 'expect';
import { shallow,mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
var ReactTestUtils = require('react-addons-test-utils');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<Ratings />', () => {
  it('should have 5 stars',() => {
    const onSubmitFn = sinon.spy();
    sinon.spy(Ratings.prototype,'onRate');
    const wrapper = mount(
      <MuiThemeProvider>
        <Ratings rate={onSubmitFn} rating={[2,4]} />
      </MuiThemeProvider>
    );
    const stars = wrapper.find('PercentageSymbol').length;
    expect(stars).toEqual(5);

  });
});
