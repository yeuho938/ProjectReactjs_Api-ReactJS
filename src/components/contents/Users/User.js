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
          user:data.user
      })
  }


    render() {
        return (
            <div>
              <h2>Hello</h2>
                 <div>
                     <h2>{this.state.user.id}</h2>
                     <h2>{this.state.user.name}</h2>
                     <h2>{this.state.user.username}</h2>
                 </div>
                  
            </div>
        );
    }
}

export default User;