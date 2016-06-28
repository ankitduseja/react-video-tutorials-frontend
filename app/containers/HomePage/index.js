/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { createSelector } from 'reselect';
import { selectGlobal } from 'containers/App/selectors';
import { selectHome } from 'containers/HomePage/selectors';
import { userLogin, userLogout, openSnackBar, closeSnackBar, videoRate, checkCookie } from 'containers/App/actions';
import LoginForm from 'components/LoginForm';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import VideoList from 'containers/VideoList';
import styles from './styles.css';

export class HomePage extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {

  }

  componentDidMount() {
    this.props.checkCookie();
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  openPage = (url) => {
    this.openRoute(url);
  }

  render() {
    var logarea=<div><LoginForm onSubmit={this.props.onLogin} onSnackbarOpen={this.props.onSnackbarOpen}/></div>;
    if(this.props.app && this.props.app.sessionId) {
      logarea=(<VideoList goto={this.openPage} rate={this.props.onRating}/>);
    }
    return (
      <article>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            {logarea}
          </section>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  home: React.PropTypes.object,
  onSubmitForm: React.PropTypes.func,
  onLogin: React.PropTypes.func,
  onLogout: React.PropTypes.func,
  onSnackbarOpen: React.PropTypes.func,
  onSnackbarClose: React.PropTypes.func,
  closeSnackBar: React.PropTypes.func,
  onRating: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    checkCookie: () => dispatch(checkCookie()),
    changeRoute: (url) => dispatch(push(url)),
    onLogin: (data) => dispatch(userLogin(data)),
    onLogout: () => dispatch(userLogout()),
    onSnackbarOpen: (m) => dispatch(openSnackBar(m)),
    onSnackbarClose: () => dispatch(closeSnackBar()),
    onRating: (data) => dispatch(videoRate(data)),
    dispatch,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectGlobal(),
  selectHome(),
  (app, home) => ({ app: app.toJS(), home:home.toJS()})
), mapDispatchToProps)(HomePage);
