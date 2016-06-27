/**
 * Test the HomePage
 */

import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import { HomePage } from '../index';

import LoginForm from 'components/LoginForm';
import VideoList from 'containers/VideoList';

describe('<HomePage />', () => {

  it('should contain Login Form when logged in', () => {
    const renderedComponent = shallow(
      <HomePage />
    );
    expect(renderedComponent.find(LoginForm).length).toEqual(1);
  });

  it('should contain Video List when logged in', () => {
    const renderedComponent = shallow(
      <HomePage app={{sessionId:'sessionId'}}  />
    );
    expect(renderedComponent.find(VideoList).length).toEqual(1);
  });
});
