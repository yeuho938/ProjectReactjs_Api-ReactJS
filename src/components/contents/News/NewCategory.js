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
                <li id ='danhmuc'><a class="active" href="https://quantrimang.com/">DANH MỤC</a></li>
                <li>
                <form onSubmit ={this.onchange}>
                 <input id="inputsearch" name ='txtSearch' type='text' placeholder='Search...'></input>
                  {this.state.sear === true?(<div><a className='link' href ='/image'>X</a></div>):''}        
                  <button className='btn btn-info' id="icon" onClick={this.search}><i class="fas fa-search"></i></button>      
                </form>
                </li>
                <li style={{color:"green"}}><p> TIN TỨC LIÊN QUAN >></p></li>
                    {this.state.categories.map((item,index)=>
                    <a href={'/imageCategory/'+ item.id} id ='link'><li key={index}><a>{item.name}</a></li></a>
                    )}
                 <li style={{color:"green"}}><p>XEM HÌNH ẢNH THEO TÊN >></p></li>
                <Link className='link'><li><a onClick = {this.sortByNameAsc}>Tên từ A - Z</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNameDesc}>Tên từ Z - A</a></li></Link>
                </ul>
                </div>
            <div id='newcontent'>
                 {this.showNewCate()}
            </div>              
        </div>
        );
    }
}

export default withRouter(NewCategory);