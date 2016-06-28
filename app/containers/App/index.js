/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';

import { connect } from 'react-redux';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
// import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import styles from './styles.css';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import { userLogout } from './actions';
import Footer from 'components/Footer';
import {selectApp} from './selectors';

function App(props) {
  var rightElem=<div></div>;
  if (props.app.sessionId!=null) {
    rightElem=<FlatButton label="Logout" onClick={props.logout.bind(this)} />
  }
  return (
    <MuiThemeProvider>
    <div className={styles.wrapper}>
        <AppBar
          title="Videos Tutorial"
          iconElementLeft={<IconButton onClick={props.gotoHome.bind(this)}><ActionHome color={'white'}/></IconButton>}
          iconElementRight={rightElem}
        />
      <div className={styles.wrapper2}>
        {props.children}
        <Footer/>
      </div>
      <Snackbar
        open={props.app.snackBarStatus}
        message={props.app.snackBarMessage}
        autoHideDuration={5000}
        onRequestClose={props.onSnackbarClose}
        />
    </div>
  </MuiThemeProvider>
  );
}
App.propTypes = {
  children: React.PropTypes.node,
  changeRoute: React.PropTypes.func,
  gotoHome: React.PropTypes.func,
};

// export default App;

const mapStateToProps = selectApp();

function mapDispatchToProps(dispatch) {
  return {
    changeRoute: (url) => dispatch(push(url)),
    gotoHome: () => dispatch(push('/')),
    logout: () => dispatch(userLogout()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
