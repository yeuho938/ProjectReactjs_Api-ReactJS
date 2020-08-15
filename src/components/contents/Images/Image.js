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
            categories: [],
            currentPage: 1,
            todosPerPage: 12,
            sortType: "asc",
            searchName: [],
            search: '',
            sear: false
        }   
        this.getData();  
        this.search = this.search.bind(this);
        this.onchange = this.onchange.bind(this);
        this.getCategory();     
        this.handleClick = this.handleClick.bind(this);
        this.sortByNameDesc = this.sortByNameDesc.bind(this);
        this.sortByNameAsc = this.sortByNameAsc.bind(this);

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
        handleClick(event) {
            this.setState({
              currentPage: Number(event.target.id)
            });
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
       searchname(){
          fetch("http://127.0.0.1:8000/api/admin/film/search")
          .then(response => {
                  response.json().then((data) =>{
                      console.log(data);
                      this.setState({
                        searchName: data 
                      })
                  });
          });
          } 
        sortByNameAsc(){
            const{images,sortType} = this.state;
            const productsort = images.sort( (a, b)=>{ 
                const sapx = (sortType ==="asc") ? 1: -1;
                return sapx * a.name.localeCompare(b.name)
            })
            this.setState({
                images: productsort
            })
       }
       sortByNameDesc(){
         const {images,sortType} = this.state;
         const productsort = images.sort( (a, b)=>{ 
             const sapx = (sortType ==="asc") ? 1: -1;
             return sapx * b.name.localeCompare(a.name)
         })
         this.setState({
            images: productsort
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
        const filteredProducts = this.state.images.filter(item => {
            return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        this.setState({
          images: filteredProducts,
          sear:true
       })
       }
    render() {
        const { images, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = images.slice(indexOfFirstTodo, indexOfLastTodo);
    
        const renderTodos = currentTodos.map((item, index) => {
            return <ImageItem
            key={index}
            item={item}
        />
        });
  
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(images.length / todosPerPage); i++) {
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
           
            <div className='imageContainer'>
                <div id='newmenu'>
                <ul>
                <li id ='danhmuc'><a class="active" href="https://quantrimang.com/">DANH MỤC</a></li>
                <li>
                <form onSubmit ={this.onchange}>
                 <input id="inputsearch" name ='txtSearch' type='text' placeholder='Search...'></input>
                  {this.state.sear === true?(<a className='link' href ='/image'>X</a>):''}        
                  <button className='btn btn-info' id="icon" onClick={this.search}><i class="fas fa-search"></i></button>      
                </form>
                </li>
                <li style={{color:"green"}}><p>LOẠI HÌNH ẢNH >></p></li>
                    {this.state.categories.map((item,index)=>
                    <a href={'/imageCategory/'+ item.id} id ='link'><li key={index}><a>{item.name}</a></li></a>
                    )}
                 <li style={{color:"green"}}><p>XEM HÌNH ẢNH THEO TÊN >></p></li>
                <Link className='link'><li><a onClick = {this.sortByNameAsc}>Tên từ A - Z</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNameDesc}>Tên từ Z - A</a></li></Link>
                </ul>
                </div>
            <div className='imagecontentbox'>
            <div id="imagecontent">
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

export default withRouter(Image);