import React, { Component } from 'react';
import ImageItem from './ImageItem';
import {withRouter} from 'react-router';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
  import './ImageItem.css';
class Image extends Component {
    constructor(props){
        super(props);
        this.state = {
            images: [],
            categories: []
        }   
        var id = props.match.params.id;
        this.getData();  
        this.getCategory();     
    }
    getData(){
        fetch("http://127.0.0.1:8000/api/admin/image/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        images: data
                    })
                });
        });
    
        }  
    showImage() {
        // const { search } = this.state;
        // const filteredImage = this.state.images.filter(image => {
        //     return image.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        // });

        var listImage = this.state.images.map((item, index) =>
            <ImageItem
                key={index}
                item={item}
            />);

        return listImage;
    }
    getCategory(){
        fetch("http://127.0.0.1:8000/api/image/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
                    this.setState({
                        categories: data 
                    })
                });
        });
    
        }  
    render() {
        return (
            <div className='imageContainer'>
                <div id='newmenu'>
                <ul>
                <li><a class="active" href="https://quantrimang.com/">Các loại tìn tức</a></li>
                    {this.state.categories.map((item,index)=>
                    <Link to={'/imageCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                    )}
                </ul>
                </div>
            <div className='imagecontent'>
               {this.showImage()}
            </div>
    
            </div>
        );
    }
}

export default withRouter(Image);