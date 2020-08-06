import React, { Component } from 'react';
import {withRouter} from 'react-router';
class NewDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            newDetail: []
        }
        var id = props.match.params.id;
        this.getDetail(id);      
    }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/new/detail/"+id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        newDetail:data
                    })
                });
        });
        }
    render() {
        return (
            <div>
            {this.state.newDetail.map((item)=>
            <div>
                <h2> Post </h2>
                <h3>Id: {item.id}</h3>
                <h3>Title: {item.name}</h3>
            </div>
                )}
            
        </div>
        );
    }
}

export default withRouter(NewDetail);


