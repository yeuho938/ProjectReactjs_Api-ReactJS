import React, { Component } from 'react';
import VideoItem from './VideoItem';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
class Video extends Component {
    constructor(){
        super();
        this.state = {
            videos: [],
            categories: []
        }     
        this.getData(); 
        this.getCategory();      
    }
    
    getData(){
        fetch("http://127.0.0.1:8000/api/admin/video/index/")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        videos: data
                    })
                });
        });
        } 
        getCategory(){
            fetch("http://127.0.0.1:8000/api/video/category")
            .then(response => {
                    response.json().then((data) =>{
                        console.log(data);
                        this.setState({
                            categories: data 
                        })
                    });
            });
        
            }
        showVideo() {
            var listVideo = this.state.videos.map((item, index) =>
                <VideoItem
                    key= {index}
                    item= {item}
                />);
    
            return listVideo;
        }
        
    render() {
        return (
            <div className='boxvideo'>
            <div id='newmenu'>
            <ul>
            <li><a class="active" href="#">Các loại video</a></li>
                {this.state.categories.map((item,index)=>
                <Link to={'/videoCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                )}
            </ul>
            </div>
            <div className='newcontent'>
                 {this.showVideo()}
            </div>              
        </div>
        );
    }
}

export default Video;