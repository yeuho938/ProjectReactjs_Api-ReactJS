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
                <Link to ={'/newdetail/' +this.props.item.id}> <img src={'http://127.0.0.1:8000/storage/'+this.props.item.image} /></Link> 
                </div>
                <div className ='newText'>
                    <div id ="nameNew">
                   <h3>{this.props.item.name}</h3>  
                    </div>
                <span id ='time_cateNew'> 
                    <p>{this.props.item.datetime}</p> 
                 </span> 
                 <div id ='text'>
                    <i> <p className='text'>{this.props.item.content}</p></i>            
                </div> 
                </div>
            </div>   
        );
    }
}

export default NewItem;