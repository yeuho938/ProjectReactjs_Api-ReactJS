import React, { Component } from 'react';
import {withRouter} from 'react-router';
class ImageDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageDetail: []
        }
        var id = props.match.params.id;
        this.getDetail(id);      
    }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/image/detail/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        imageDetail:data
                    })
                });
        });
        }
    render() {
        return (
            <div>
            {this.state.imageDetail.map((item)=>
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

export default withRouter(ImageDetail);