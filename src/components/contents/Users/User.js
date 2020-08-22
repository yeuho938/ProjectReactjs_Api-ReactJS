import React, { Component } from 'react';

class User extends Component {
    constructor(props) {
        super(props);
        let user_id = localStorage.getItem("user_id");
        this.state = {
            user: []
        }
        this.getUser(user_id);
    }

  getUser(id) {
      fetch('http://127.0.0.1:8000/api/auth/profile/', {
          method: "get",
          headers: {
              "Authorization": id
          },
      })
          .then(response => {
              response.json().then((data) => {
                  this.updateUI(data);
              });
          });
  }
    updateUI(data) {
      this.setState({
          user: data.user
      })
  }


    render() {
        return (
            <div>
                 <div style={{marginLeft:"20%",marginTop:"30px"}}>
                     <h2>Your information</h2>
                     <h3> Tên: {this.state.user.fullname}</h3>
                     <h3> Username: {this.state.user.username}</h3>
                     <h3> Email: {this.state.user.email}</h3>
                     <h3> Address: {this.state.user.address}</h3>
                     <h3> Phone: {this.state.user.phone}</h3>
                 </div>
                  
            </div>
        );
    }
}

export default User;