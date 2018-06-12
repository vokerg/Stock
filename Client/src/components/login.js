import React from 'react';
import { login } from '../api/loginApi'

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username:"",
      password:"",
      errorMessage:""
    };
  }

  onChange = event =>
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
  })

  onSubmit = event => {
    event.preventDefault();
    login(this.state.username, this.state.password)(({token, status, ...user}) => {
      if (status === 200) {
        localStorage.setItem('authorization', token)
        localStorage.setItem('user', JSON.stringify(user));
        this.props.history.push("/")
      } else {
        this.setState({errorMessage: "Incorrect username or passowrd"})
      }
    });
  }

  render() {
    return (
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

export default Login;
