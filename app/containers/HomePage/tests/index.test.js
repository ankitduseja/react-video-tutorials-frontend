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

  it('blah blah',()=>{
    var a=2;
    console.log(expect(2).toEqual());
    expect(a).to.be.above(0);
  });
  it('should contain LoginForm when not logged in',() => {
    const renderedComponent = shallow(<HomePage />);
    expect(renderedComponent.find('LoginForm').length).toEqual(1);
  });
  it('Yo: should contain Login Form when logged in', () => {
    const renderedComponent = shallow(
      <HomePage />
    );
    expect(renderedComponent.find(LoginForm).length).toEqual(1);
  });

  it('should contain VideoList when logged in',() => {
    const renderedComponent = shallow(<HomePage app={{sessionId:'sessionId'}} />);
    console.log(renderedComponent.props());
    expect(renderedComponent.find('VideoList').length).to.be.above(1);
  });

  it('Yo: should contain Video List when logged in', () => {
    const renderedComponent = shallow(
      <HomePage app={{sessionId:'sessionId'}}  />
    );
    expect(renderedComponent.find(VideoList).length).toEqual(1);
  });
});
