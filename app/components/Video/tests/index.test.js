import Video from '../index';

import expect from 'expect';
import { shallow,mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
var ReactTestUtils = require('react-addons-test-utils');

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<Video />', () => {
  let v;
  var onPlayFn;
  beforeEach(() => {
    onPlayFn = sinon.spy();
    v = {"_id":"576e5ef09f20850f5c8b1068","name":"[1] Google Cardboard Assembly","description":"Google Cardboard Assembly Step by Step Instructions [HD]","url":"videos/Google_Cardboard_Assembly.mp4","__v":2,"ratings":[4,5,5,5,3,5,4,5,3,3]};
  });

  it('should load video on video page',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <Video activeVideo={true} onPlay={onPlayFn} width={180} height={100} via={'page'} videoProp={v}></Video>
      </MuiThemeProvider>
    );
    expect(wrapper.find('video').length).toEqual(1);
  });

  it('should not load video in box on video list',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <Video activeVideo={true} onPlay={onPlayFn} width={180} height={100} via={'box'} videoProp={v}></Video>
      </MuiThemeProvider>
    );
    expect(wrapper.find('video').get(0)).toEqual(undefined);
  });

  it('should autoplay on video page',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <Video activeVideo={true} onPlay={onPlayFn} width={180} height={100} via={'page'} videoProp={v}></Video>
      </MuiThemeProvider>
    );
    expect(wrapper.find('video').get(0).hasAttribute('autoplay')).toEqual(true);
  });

  it('should load video on cover click',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <Video activeVideo={true} onPlay={onPlayFn} width={180} height={100} via={'box'} videoProp={v}></Video>
      </MuiThemeProvider>
    );
    var cover=wrapper.find('[data-cname="VideoCover"]').get(0);
    ReactTestUtils.Simulate.click(cover);
    expect(onPlayFn.calledOnce).toEqual(true);
  });
});
