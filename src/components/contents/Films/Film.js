import React, { Component } from 'react';

class Film extends Component {
    constructor(){
        super();
        this.state = {
            films: []
        }     
        this.getData();       
    }
    
    getData(){
        fetch("http://127.0.0.1:8000/api/admin/film/index")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
        this.updateUI(data);
                });
        });
    
        }  
    updateUI(data){
        this.setState({
            films: data
        })
    }
    render() {
        return (
            <div>
                <h2>Hello</h2>
                {this.state.films.map(item=>
                <div>
                <h3>{item.name}</h3>
                <h3><video src={'http://127.0.0.1:8000/storage/'+item.video} controls></video></h3>
                <h3>{item.status}</h3>
                <h3>{item.category_id}</h3> 
                </div>                               
                )}
            </div>
        );
    }
}

export default Film;
