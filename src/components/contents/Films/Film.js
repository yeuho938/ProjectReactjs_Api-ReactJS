import React, { Component } from 'react';
import FilmItem from './FilmItem';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
  import './Film.css';
class Film extends Component {
    constructor(props){
        super(props);
        this.state = {
            films: [],
            categories: [],
            currentPage: 1,
            todosPerPage: 12,
            sortType: "asc",
            search: '',
            sear: false,
        }   
        this.getData();  
        this.handleClick = this.handleClick.bind(this);
        this.getCategory();     
        this.sortByNameDesc = this.sortByNameDesc.bind(this);
        this.sortByNameAsc = this.sortByNameAsc.bind(this);
        this.onchange = this.onchange.bind(this); 
        this.search = this.search.bind(this);
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    getData(){
        fetch("http://127.0.0.1:8000/api/admin/film/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        films: data
                    })
                });
        });
    
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
        sortByNameAsc(){
            const{films,sortType} = this.state;
            const productsort = films.sort( (a, b)=>{ 
                const sapx = (sortType ==="asc") ? 1: -1;
                return sapx * a.name.localeCompare(b.name)
            })
            this.setState({
                films: productsort
            })
       }
       sortByNameDesc(){
         const {films,sortType} = this.state;
         const productsort = films.sort( (a, b)=>{ 
             const sapx = (sortType ==="asc") ? 1: -1;
             return sapx * b.name.localeCompare(a.name)
         })
         this.setState({
            films: productsort
         })
       } 
       onchange(event) {
        event.preventDefault();
        var search = event.target["txtSearch"].value;
        this.setState({
            search: search
         })
       }
       search(){
        const { search } = this.state;
        const filteredProducts = this.state.films.filter(item => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        this.setState({
          films: filteredProducts,
          sear:true
       })
       }
    render() {
        const { films, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = films.slice(indexOfFirstTodo, indexOfLastTodo);
    
        const renderTodos = currentTodos.map((item, index) => {
            return <FilmItem
            key={index}
            item={item}
        />
        });
  
      // Logic for displaying page numbers
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(films.length / todosPerPage); i++) {
        pageNumbers.push(i);
      }
      const renderPageNumbers = pageNumbers.map(number => {
        return (
          <button id='button_page'
            key={number}
            id={number}
            onClick={this.handleClick}
          >
            {number}
          </button>
        );
      });
        return (
            <div className='filmContainer'>
                <div id='newmenu'>
                <ul>
                <li id ='danhmuc'><a class="active" href="https://quantrimang.com/">DANH MỤC</a></li>
                <li>
                <form onSubmit={this.onchange}>
                <input id="inputsearch" name ='txtSearch' type='text' placeholder='Search...'></input>
                  {this.state.sear === true?(<a className='link' href ='/image'>X</a>):''}        
                  <button className='btn btn-info' id="icon" onClick={this.search}><i class="fas fa-search"></i></button>                   
                </form>
                </li>
                <li style={{color:"green"}}><p> LOẠI PHIM >></p></li>
                    {this.state.categories.map((item,index)=>
                    <a href={'/filmCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></a>
                    )}
                 <li style={{color:"green"}}><p> PHIM THEO TÊN >></p></li>
                <Link className='link'><li><a onClick = {this.sortByNameAsc}>Tên từ A - Z</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNameDesc}>Tên từ Z - A</a></li></Link>
                </ul>
                </div>
            <div className='filmcontentbox'>
                <div id="filmcontent">
                {renderTodos}
                </div>
                <div id='page_number'>
                {renderPageNumbers}
                </div>           
            </div>
            </div>
        );
    }
}

export default Film;
