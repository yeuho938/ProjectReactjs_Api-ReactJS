import React, { Component } from 'react';
import './ImageItem.css';
import { 
    Link } 
  from "react-router-dom";
class ImageItem extends Component {
    render() {
        return (     
                <div className='image'>
                    <Link to ={'/imagedetail/' + this.props.item.id}> <img src={' http://127.0.0.1:8000/storage/'+this.props.item.image} /></Link>
                    <h3 className='h'>{this.props.item.name}</h3>
                </div>             
        );
    }
}

export default ImageItem;