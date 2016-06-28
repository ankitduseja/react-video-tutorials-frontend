import LazyLoader from '../index';

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import React from 'react';

import { Provider } from 'react-redux';
import store from 'testStore';

describe('<LazyLoader />', () => {
  // it('calls componentDidMount', () => {
    // expect.spyOn(LazyLoader.prototype, 'componentDidMount');
  //   sinon.spy(LazyLoader.prototype, 'componentDidMount');
  //   const wrapper = mount(<Provider><LazyLoader /></Provider>);
  //   expect(LazyLoader.prototype.componentDidMount.calledOnce).toBe(true);
  //   LazyLoader.prototype.componentDidMount.restore();
  // });
});
