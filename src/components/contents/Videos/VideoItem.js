import React, { Component } from 'react';
import { 
    Link } 
  from "react-router-dom";
class VideoItem extends Component {
    render() {
        return (
            <div className='VideoItem'>
                <div className='VideoImage'>
                <Link to ={'/videodetail/' + this.props.item.id}> <video src={'http://127.0.0.1:8000/storage/' + this.props.item.video} controls></video> hhh</Link> 
                </div>
                <div className ='VideoText'>
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

export default VideoItem;