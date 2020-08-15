import React, { Component } from 'react';
import {withRouter} from 'react-router';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
  import FilmItem from './FilmItem';
class FilmCategory extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryFilm : [],
            categories: []
        }   
        var id = props.match.params.id;
        this.getFilmCate(id);   
        this.getCategory();  
        this.showFilmCate = this.showFilmCate.bind(this);   
    }
    getCategory(){
        fetch("http://127.0.0.1:8000/api/admin/film/category")
        .then(response => {
                response.json().then((data) =>{
                    console.log(data);
                    this.setState({
                        categories: data 
                    })
                });
         });
        }  
        getFilmCate(id){
        fetch("http://127.0.0.1:8000/api/film/category/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        categoryFilm:data
                    })
                });
        });   
    }
    showFilmCate() {
        var listFilmCate = this.state.categoryFilm.map((item, index) =>
            <FilmItem
                key={index}
                item={item}
            />);

        return listFilmCate;
    }
    render() {
        return (
            <div className='filmContainer'>
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
                <li style={{color:"green"}}><p> THỂ LOẠI PHIM >></p></li>
                    {this.state.categories.map((item,index)=>
                    <a href={'/imageCategory/'+ item.id} id ='link'><li key={index}><a>{item.name}</a></li></a>
                    )}
                 <li style={{color:"green"}}><p>XEM HÌNH ẢNH THEO TÊN >></p></li>
                <Link className='link'><li><a onClick = {this.sortByNameAsc}>Tên từ A - Z</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNameDesc}>Tên từ Z - A</a></li></Link>
                </ul>
                </div>
            <div id='imagecontent'>
                 {this.showFilmCate()}
            </div>              
        </div>          
        );
    }
}

export default withRouter(FilmCategory);