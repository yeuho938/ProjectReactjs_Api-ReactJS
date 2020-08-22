import React, { Component } from 'react';
import './Register.css';
import {  Link } from "react-router-dom";
import { withRouter } from 'react-router';
class Register extends Component {
    constructor() {
        super();
        this.onRegister = this.onRegister.bind(this);
      }
  onRegister(event){
    event.preventDefault();
    let fullname = event.target['fullname'].value;
    let username = event.target['username'].value;
    let email = event.target['email'].value;
    let password = event.target['password'].value;
    let address = event.target['address'].value;
    let role = 0;
    let phone = event.target['phone'].value;


    let user = {
        fullname:fullname,
        username:username,
        password: password,
        email: email,
        address: address,
        phone: phone,
        role : role
    }

    let postInJson = JSON.stringify(user);
    console.log(postInJson);
    fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "post",
        headers: {
            "Content-Type":"application/json"
        },
        body: postInJson
    })
    .then((response) => {
        console.log(response);
        alert(' Bạn đã đăng ký thành công!')
        this.props.history.push("/login"); // chuyển trang
    });
}
    render() {
        return (
            <div id="login-box">
            <div className="left">
                <form  onSubmit={this.onRegister}>
                    <h1>Sign up</h1>
                    <input type="text" name="fullname" placeholder="Fullname" />
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <input type="text" name="email" placeholder="E-mail" />                  
                    <input type="text" name="address" placeholder="Address" />
                    <input type="text" name="phone" placeholder="phone" />
                    <button type="submit" name="signup_submit"> Sign up</button>
              </form>
            </div>
            <div className="right">
              <span className="loginwith">Sign in with<br />social network</span>
              <button className="social-signin google"><Link to = '/login' id ='dd'>Log in with Your Account+</Link></button>
            </div>
            <div className="or">OR</div>
          </div>
        );
    }
}

export default withRouter(Register);