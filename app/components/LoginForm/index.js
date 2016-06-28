/**
*
* LoginForm
*
*/

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import styles from './styles.css';

class LoginForm extends React.Component {
  componentWillMount() {
    var userNameError='';
    var userPassError='';
  }
  onSubmitLoginForm() {
    var data={
      userName: this.refs['un'].input.value,
      userPass: this.refs['pw'].input.value,
    }
    if(data.userName==='') {
      this.props.onSnackbarOpen('Username is required');
      return false;
    }
    if(data.userPass==='') {
    this.props.onSnackbarOpen('Password is required');
      return false;
    }
    this.props.onSubmit(data);
  }
  render() {
    return (
      <div className={ styles.loginForm }>
        <Paper className={styles.loginPaper}>
          <form>
            <TextField hintText='Username' floatingLabelText='Username' type='text' name='username' ref='un' required={true} />
            <TextField hintText='Password' floatingLabelText='Password' type='password' name='password' ref='pw' required={true} />
            <br/>
            <br/>
            <RaisedButton onClick={this.onSubmitLoginForm.bind(this)} primary={true} label='Submit' />
          </form>
        </Paper>
      </div>
    );
  }
}

export default LoginForm;
