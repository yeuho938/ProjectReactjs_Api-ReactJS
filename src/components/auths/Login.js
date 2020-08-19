import React, { Component } from 'react';
import './Login.css';
import { withRouter } from 'react-router';
class Login extends Component {
  constructor() {
    super();
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(event) {
    event.preventDefault();
    let username = event.target['username'].value;
    let password = event.target['password'].value;

    let users = {
        username:username,
        password:password
    }
    let postInJson = JSON.stringify(users);
    console.log(postInJson);
    fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: postInJson
    })
    .then((response) => {
       return response.json();
    })
    .then((response)=>{
    if(response.user_id!=null){
    console.log(response);
    localStorage.setItem("user_id",response.user_id);
    this.props.history.push("/");
    window.location.reload();     
  }
    else{
      alert("Username or password is wrong!");
    }
    });
}
    render() {
        return (
            <div className="login-form">
            <form onSubmit={this.onLogin} method="POST">
              <h1>Login</h1>
              <div className="form-group">
              {/* <span className="input-icon"><i className="fa fa-envelope" /></span>  */}
                <input type="text" name="username" placeholder=" Username" />
              </div>
              <div className="form-group">
              {/* <span className="input-icon"><i className="fa fa-lock" /></span>  */}
                <input type="password" name="password" placeholder="Password" />
              </div>      
              <button className="login-btn" type='submit'>Login</button>      
              <a className="reset-psw" href="#">Forgot your password?</a>
              <div className="seperator"><b>or</b></div>
              <p>Sign in with your social media account</p>
              <div className="social-icon">
                <button type="button"><i className="fab fa-twitter"></i></button>
                <button type="button"><i className="fab fa-facebook-f"></i></button>
              </div>
            </form>
          </div>
        );
    }
}

export default withRouter(Login);