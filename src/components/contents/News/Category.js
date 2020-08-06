import React, { Component } from 'react';
import './Category.css';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
class Category extends Component {
    constructor(){
        super();
        this.state = {
            categories: []
        }     
        this.getCategory();      
    }
    getCategory(){
        fetch("http://127.0.0.1:8000/api/new/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
        this.updateCategory(data);
                });
        });
    
        }  
    updateCategory(data){
        this.setState({
            categories: data 
        })
    }
    render() {
        return (
            <div id='category'>
                <ul>
                <li><a class="active" href="https://quantrimang.com/">Các loại tìn tức</a></li>
                    {this.state.categories.map((item,index)=>
                    <Link to={'/newCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                    )}
                </ul>
            </div>
        );
    }
}

export default Category;