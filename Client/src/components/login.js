import React from 'react';
import { connect } from 'react-redux';

import { login } from '../api';
import { stateLogin } from '../actions';
import { getCurrentUser } from '../reducers';

class Login extends React.Component {
  state = {
    username:"",
    password:"",
    errorMessage:""
  };

  onChange = event => this.setState({ [event.target.name]: event.target.value });

  onSubmit = event => {
    event.preventDefault();
    login(this.state.username, this.state.password)(({token, status, ...user}) => {
      if (status === 200) {
        localStorage.setItem('authorization', token)
        localStorage.setItem('user', JSON.stringify(user));
        this.props.stateLogin(token, user);
        this.props.history.push("/");
      } else {
        this.setState({ errorMessage: "Incorrect username or passowrd" })
      }
    });
  }

  render() {
    return (
      this.props.currentUser ?
      <div>First logout...</div>
      :
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div>{this.state.errorMessage}</div>
          <div>
            Username: <input type="text" name="username" value={this.state.username} onChange={this.onChange.bind(this)}/>
          </div>
          <div>
            Password: <input type="password" name="password" value={this.state.password} onChange = {this.onChange.bind(this)}/>
          </div>
          <div>
            <input type="submit" value="Login"/>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
})

const mapDispatchToProps = dispatch => ({
  stateLogin: (authorization, user) => dispatch(stateLogin(authorization, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);
