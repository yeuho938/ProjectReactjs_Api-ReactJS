import React, { Component } from 'react';
import { 
    Link } 
  from "react-router-dom";
class FilmItem extends Component {
    render() {
        return (
            <div id ='filmItem'>
                <Link to ={'/filmdetail/' + this.props.item.id}> <img src={' http://127.0.0.1:8000/storage/'+this.props.item.image} /></Link>
                <Link to ={'/filmdetail/' + this.props.item.id} style={{textDecoration:"none", color:"black"}}> <h3>{this.props.item.name}</h3></Link>
            </div>
        );
    }
}

export default FilmItem;