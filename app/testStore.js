import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import configureStore from './store';

const initialState = {};
const store = configureStore(initialState, browserHistory);

export default store;
