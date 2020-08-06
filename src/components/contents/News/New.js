import React, { Component } from 'react';
import './New.css';
import './menu.css';
import NewItem from './NewItem';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
class New extends Component {
    constructor(){
        super();
        this.state = {
            news: [],
            categories: []
        }     
        this.getData(); 
        this.getCategory();      
    }
    
    getData(){
        fetch("http://127.0.0.1:8000/api/admin/new/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        news: data
                    })
                });
        });
    
        }  
    getCategory(){
        fetch("http://127.0.0.1:8000/api/new/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
                    this.setState({
                        categories: data 
                    })
                });
        });
    
        }  
    showNew() {
        var listNew = this.state.news.map((item, index) =>
            <NewItem
                key={index}
                item={item}
            />);

        return listNew;
    }
    
    render() {
        return (
            <div className='boxnew'>
                <div id='newmenu'>
                <ul>
                <li><a class="active" href="https://quantrimang.com/">Các loại tìn tức</a></li>
                    {this.state.categories.map((item,index)=>
                    <Link to={'/newCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                    )}
                </ul>
                </div>
                <div className='newcontent'>
                     {this.showNew()}
                </div>              
            </div>
        );
    }
}

export default New;