import LoginForm from '../index';

import ReactDOM from 'react-dom';
import expect from 'expect';
import { shallow,mount } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
var ReactTestUtils = require('react-addons-test-utils');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<LoginForm />', () => {
  it('should not submit if username is blank',() => {
    const onSubmit = sinon.spy();
    const onSnackbarOpen = sinon.spy();
    const wrapper = mount(
      <MuiThemeProvider>
        <LoginForm onSubmit={onSubmit} onSnackbarOpen={onSnackbarOpen} />
      </MuiThemeProvider>
    );
    wrapper.find('form').simulate('submit');
    expect(onSnackbarOpen.calledWith('Username is required')).toEqual(true);
    expect(onSubmit.calledOnce).toEqual(false);
  });
  it('should not submit if password is blank',() => {
    const onSubmit = sinon.spy();
    const onSnackbarOpen = sinon.spy();
    const wrapper = mount(
      <MuiThemeProvider>
        <LoginForm onSubmit={onSubmit} onSnackbarOpen={onSnackbarOpen} />
      </MuiThemeProvider>
    );
    var username=wrapper.find('TextField').get(0).input;
    username.value='some username';
    wrapper.find('form').simulate('submit');
    expect(onSnackbarOpen.calledWith('Password is required')).toEqual(true);
    expect(onSubmit.calledOnce).toEqual(false);
  });
  it('should submit if username and password is filled',() => {
    const onSubmitFn = sinon.spy();
    sinon.spy(LoginForm.prototype,'onSubmitLoginForm');
    const wrapper = mount(
      <MuiThemeProvider>
        <LoginForm onSubmit={onSubmitFn} />
      </MuiThemeProvider>
    );
    var username=wrapper.find('TextField').get(0).input;
    var password=wrapper.find('TextField').get(1).input;
    username.value='some username';
    password.value='some password';
    // const button = ReactTestUtils.findRenderedDOMComponentWithTag(wrapper.instance(), 'button');
    // const node = ReactDOM.findDOMNode(button);
    // ReactTestUtils.Simulate.click(node);
    wrapper.find('form').simulate('submit');
    expect(LoginForm.prototype.onSubmitLoginForm.calledOnce).toBe(true);
    expect(onSubmitFn.calledOnce).toEqual(true);
  });
});
