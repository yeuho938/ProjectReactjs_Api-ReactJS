import React, { Component } from 'react';
import VideoItem from './VideoItem';
import {withRouter} from 'react-router';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
class VideoCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryVideo: [],
            categories: []
        }   
        var id = props.match.params.id;
        this.getVideoCate(id);  
        this.getCategory();      
        this.showVideoCate = this.showVideoCate.bind(this);   
    }
    getCategory(){
        fetch("http://127.0.0.1:8000/api/video/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
                    this.setState({
                        categories: data 
                    });
                });
        });  
        }  
    getVideoCate(id){
        fetch("http://127.0.0.1:8000/api/video/category/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        categoryVideo:data
                    })
                });
        });   
    }
    showVideoCate() {
        var listVideoCate = this.state.categoryVideo.map((item, index) =>
            <VideoItem
                key={index}
                item={item}
            />);

        return listVideoCate;
    }
    render() {
        return (
            <div className='boxnew'>
            <div id='newmenu'>
            <ul>
            <li><a class="active" href="#">Các loại tìn tức</a></li>
                {this.state.categories.map((item,index)=>
                <Link to= {'/videoCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                )}
            </ul>
            </div>
            <div className='videocontent'>
                 {this.showVideoCate()}
            </div>              
        </div>
        );
    }
}

export default withRouter(VideoCategory);