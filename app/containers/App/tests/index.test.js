import expect from 'expect';
import { shallow, mount } from 'enzyme';
import React from 'react';

import App from '../index';
import Footer from 'components/Footer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from '../../../store';

const initialState = {};
const store = configureStore(initialState, browserHistory);

describe('<App />', () => {

  it('should render its children', () => {
    const children = (<h1>Test</h1>);
    const renderedComponent = shallow(
      <Provider store={store}>
        <App>
          {children}
        </App>
      </Provider>
    );
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should render the footer', () => {
  const renderedComponent = mount(
    <Provider store={store}>
      <App/>
    </Provider>
  );
  expect(renderedComponent.find(Footer).length).toEqual(1);
});
});
