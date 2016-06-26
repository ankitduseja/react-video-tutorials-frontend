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

import {
  selectRepos,
  selectLoading,
  selectError,
} from 'containers/App/selectors';

import {
  selectHome,
} from 'containers/HomePage/selectors';

import {
  selectUsername,
} from './selectors';

import { changeUsername, userLogin, userLogout, openSnackBar, closeSnackBar } from './actions';
import { loadRepos } from '../App/actions';

import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import LoginForm from 'components/LoginForm';

import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import VideoList from 'containers/VideoList';

import styles from './styles.css';

export class HomePage extends React.Component {
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
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
  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };
  openPage = (url) => {
    this.openRoute(url);
  }
  onRate = (x) => {
    console.log(x);
  }

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem item={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos !== false) {
      mainContent = (<List items={this.props.repos} component={RepoListItem} />);
    }

    // user
    var logarea=[];
    var logStatus=null;
    if(this.props.home.sessionId) {
      logStatus=<RaisedButton onClick={this.props.onLogout}>Logout</RaisedButton>;
      logarea.push(<VideoList goto={this.openPage} rate={this.onRate}/>);
    } else {
      logStatus=<LoginForm onSubmit={this.props.onLogin} onSnackbarOpen={this.props.onSnackbarOpen}/>
    }
    logarea.push(logStatus);
    return (
      <article>
        <div>
          <section className={`${styles.textSection} ${styles.centered}`}>
            {logarea}
          </section>

          <Button handleRoute={this.openFeaturesPage}>Features</Button>

          <Snackbar
            open={this.props.home.snackBarStatus}
            message={this.props.home.snackBarMessage}
            action="undo"
            autoHideDuration={5000}
            onActionTouchTap={this.handleActionTouchTap}
            onRequestClose={this.props.onSnackbarClose}
          />
        </div>
      </article>
    );
  }
}

// <section className={styles.textSection}>
//   <H2>Try me!</H2>
//   <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
//     <label htmlFor="username">Show Github repositories by
//       <span className={styles.atPrefix}>@</span>
//       <input
//         id="username"
//         className={styles.input}
//         type="text"
//         placeholder="mxstbr"
//         value={this.props.username}
//         onChange={this.props.onChangeUsername}
//       />
//     </label>
//   </form>
//   {mainContent}
// </section>

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  home: React.PropTypes.object,
  onSubmitForm: React.PropTypes.func,
  onLogin: React.PropTypes.func,
  onLogout: React.PropTypes.func,
  openSnackBar: React.PropTypes.func,
  closeSnackBar: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onLogin: (data) => dispatch(userLogin(data)),
    onLogout: () => dispatch(userLogout()),
    onSnackbarOpen: (m) => dispatch(openSnackBar(m)),
    onSnackbarClose: () => dispatch(closeSnackBar()),
    onSubmitForm: (evt) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },

    dispatch,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectHome(),
  selectRepos(),
  selectUsername(),
  selectLoading(),
  selectError(),
  (home, repos, username, loading, error) => ({ home:home.toJS(), repos, username, loading, error })
), mapDispatchToProps)(HomePage);
