import React, { Component } from 'react';
import './NewItem.css';
import { 
    Link } 
  from "react-router-dom";
class NewItem extends Component {
    render() {
        return ( 
            <div className='newItem'>
                <div className='newImage'>
                <Link to ={'/newdetail/'+this.props.item.id}> <img src={'http://127.0.0.1:8000/storage/'+this.props.item.image} /></Link> 
                </div>
                <div className ='newText'>
                <h3>{this.props.item.name}</h3>  
                <span id ='time_cateNew'> 
                <h3>{this.props.item.category_id}</h3> 
                <h3>{this.props.item.datetime}</h3> 
                 </span>            
               
                </div>
            </div>   
        );
    }
}

export default NewItem;