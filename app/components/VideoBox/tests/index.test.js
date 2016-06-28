import VideoBox from '../index';

import expect from 'expect';
import { shallow,mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import sinon from 'sinon';
var ReactTestUtils = require('react-addons-test-utils');
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

describe('<VideoBox />', () => {
  let v;
  var onGotoFn;
  var onRateFn;
  var onPlayFn;
  beforeEach(() => {
    v = {"_id":"576e5ef09f20850f5c8b1068","name":"[1] Google Cardboard Assembly","description":"Google Cardboard Assembly Step by Step Instructions [HD]","url":"videos/Google_Cardboard_Assembly.mp4","__v":2,"ratings":[4,5,5,5,3,5,4,5,3,3]};
    onGotoFn = sinon.spy();
    onRateFn = sinon.spy();
    onPlayFn = sinon.spy();
  });
  it('should have <Ratings/>',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <VideoBox activeVideo={true} goto={onGotoFn} rate={onRateFn} key={'xyz'} nos={1} videoProp={v} onPlay={onPlayFn}/>
      </MuiThemeProvider>
    );
    const rating = wrapper.find('Ratings').length;
    expect(rating).toEqual(1);
  });
  it('should have <Video/>',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <VideoBox activeVideo={true} goto={onGotoFn} rate={onRateFn} key={'xyz'} nos={1} videoProp={v} onPlay={onPlayFn}/>
      </MuiThemeProvider>
    );
    const vid = wrapper.find('Video').length;
    expect(vid).toEqual(1);
  });
  it('should display title',() => {
    const wrapper = mount(
      <MuiThemeProvider>
        <VideoBox activeVideo={true} goto={onGotoFn} rate={onRateFn} key={'xyz'} nos={1} videoProp={v} onPlay={onPlayFn}/>
      </MuiThemeProvider>
    );
    const title = wrapper.find('[data-cname="title"]');
    expect(title.length).toEqual(1);
    expect(title.text()).toEqual('[1] Google Cardboard Assembly');
  });
});
