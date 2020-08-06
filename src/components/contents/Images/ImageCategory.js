import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './Image.css';
import ImageItem from './ImageItem';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
  import './Image.css';
class ImageCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryImage: [],
            categories: []
        }   
        var id = props.match.params.id;
        this.getImageCate(id);   
        this.getCategory();  
        this.showImageCate = this.showImageCate.bind(this);   
    }
    getCategory(){
        fetch("http://127.0.0.1:8000/api/image/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
                    this.setState({
                        categories: data 
                    });
                });
        });  
        }  
    getImageCate(id){
        fetch("http://127.0.0.1:8000/api/image/category/"+id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        categoryImage:data
                    })
                });
        });   
    }
    showImageCate() {
        var listNewCate = this.state.categoryImage.map((item, index) =>
            <ImageItem
                key={index}
                item={item}
            />);

        return listNewCate;
    }
    render() {
        return (
            <div className='boximage'>
            <div id='newmenu'>
            <ul>
            <li><a class="active" href="#">Các loại hình ảnh</a></li>
                {this.state.categories.map((item,index)=>
                <Link to= {'/imageCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                )}
            </ul>
            </div>
            <div className='imagecontent'>
                 {this.showImageCate()}
            </div>              
        </div>          
        );
    }
}

export default withRouter(ImageCategory);