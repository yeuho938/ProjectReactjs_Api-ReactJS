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
            categories: [],
            currentPage: 1,
            todosPerPage: 5,
            sortType: "asc",
            search: '',
            sear: false
        }     
        this.getData(); 
        this.getCategory();      
        this.search = this.search.bind(this);
        this.onchange = this.onchange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.sortByNameDesc = this.sortByNameDesc.bind(this);
        this.sortByNameAsc = this.sortByNameAsc.bind(this);

    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
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
    sortByNameAsc(){
          const{news,sortType} = this.state;
          const productsort = news.sort( (a, b)=>{ 
              const sapx = (sortType ==="asc") ? 1: -1;
              return sapx * a.datetime.localeCompare(b.datetime)
          })
          this.setState({
            news: productsort
          })
     }
     sortByNameDesc(){
       const {news,sortType} = this.state;
       const productsort = news.sort( (a, b)=>{ 
           const sapx = (sortType ==="asc") ? 1: -1;
           return sapx * b.datetime.localeCompare(a.datetime)
       })
       this.setState({
        news: productsort
       })
     } 
     search(){
      const { search } = this.state;
      const filteredProducts = this.state.news.filter(item => {
          return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      });
      this.setState({
        news: filteredProducts,
        sear:true
     })
     }
     onchange(event){
      event.preventDefault();
      var search = event.target["txtSearch"].value;
      this.setState({
          search: search
       })
     }
    render() {
        const {news, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = news.slice(indexOfFirstTodo, indexOfLastTodo);
    
        const renderTodos = currentTodos.map((item, index) => {
            return <NewItem
            key={index}
            item={item}
        />
        });
  
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(news.length / todosPerPage); i++) {
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
            <div className='boxnew'>
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
                <li style={{color:"green"}}><p> LOẠI TIN TỨC >></p></li>
                    {this.state.categories.map((item,index)=>
                    <a href={'/newCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></a>
                    )}
                 <li style={{color:"green"}}><p> TIN TỨC THEO NGÀY >></p></li>
                <Link className='link'><li><a onClick = {this.sortByNameDesc}> Mới -> Cũ</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNameAsc}>Cũ  -> Mới</a></li></Link>
                </ul>
                </div>
                <div className='newcontentbox'>
                    <div id="newcontent">
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

export default New;