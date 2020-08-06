import React, { Component } from 'react';
import NewItem from './NewItem';
import {withRouter} from 'react-router';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
import './New.css';
class NewCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryNew: [],
            categories: []
        }   
        var id = props.match.params.id;
        this.getNewCate(id);  
        this.getCategory();      
        this.showNewCate = this.showNewCate.bind(this);   
    }
    getCategory(){
        fetch("http://127.0.0.1:8000/api/new/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
                    this.setState({
                        categories: data 
                    });
                });
        });  
        }  
    getNewCate(id){
        fetch("http://127.0.0.1:8000/api/new/category/"+id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        categoryNew:data
                    })
                });
        });   
    }
    showNewCate() {
        var listNewCate = this.state.categoryNew.map((item, index) =>
            <NewItem
                key={index}
                item={item}
            />);

        return listNewCate;
    }
    render() {
        return (
            <div className='boxnew'>
            <div id='newmenu'>
            <ul>
            <li><a class="active" href="#">Các loại tìn tức</a></li>
                {this.state.categories.map((item,index)=>
                <Link to= {'/newCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></Link>
                )}
            </ul>
            </div>
            <div className='newcontent'>
                 {this.showNewCate()}
            </div>              
        </div>
        );
    }
}

export default withRouter(NewCategory);