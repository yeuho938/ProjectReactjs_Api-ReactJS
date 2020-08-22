import React, { Component } from 'react';
import VideoItem from './VideoItem';
import { 
    BrowserRouter as Router, 
    Link } 
  from "react-router-dom";
  import './Video.css';
class Video extends Component {
    constructor(){
        super();
        this.state = {
            videos: [],
            categories: [],
            currentPage: 1,
            todosPerPage: 5,
            sortType: "asc",
            search: '',
            sear: false
        }     
        this.getData(); 
        this.getCategory();   
        this.handleClick = this.handleClick.bind(this);
        this.sortByNameDesc = this.sortByNameDesc.bind(this);
        this.sortByNameAsc = this.sortByNameAsc.bind(this);
        this.sortByNewDate = this.sortByNewDate.bind(this);
        this.search = this.search.bind(this);
        this.onchange = this.onchange.bind(this);
        
    }
    handleClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
      }
    getData(){
        fetch("http://127.0.0.1:8000/api/admin/video/index/")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        videos: data
                    })
                });
        });
        } 
        getCategory(){
            fetch("http://127.0.0.1:8000/api/video/category")
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
              const{videos,sortType} = this.state;
              const productsort = videos.sort( (a, b)=>{ 
                  const sapx = (sortType ==="asc") ? 1: -1;
                  return sapx * a.name.localeCompare(b.name)
              })
              this.setState({
                videos: productsort
              })
         }
         sortByNameDesc(){
           const {videos,sortType} = this.state;
           const productsort = videos.sort( (a, b)=>{ 
               const sapx = (sortType ==="asc") ? 1: -1;
               return sapx * b.name.localeCompare(a.name)
           })
           this.setState({
            videos: productsort
           })
         } 
         sortByNewDate(){
          const {videos,sortType} = this.state;
          const productsort = videos.sort( (a, b)=>{ 
              const sapx = (sortType ==="asc") ? 1: -1;
              return sapx * b.datetime.localeCompare(a.datetime)
          })
          this.setState({
            videos: productsort
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
          const filteredProducts = this.state.videos.filter(item => {
              return item.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
          });
          this.setState({
            videos: filteredProducts,
            sear:true
         })
         }
    render() {
        const {videos, currentPage, todosPerPage } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = videos.slice(indexOfFirstTodo, indexOfLastTodo);
    
        const renderTodos = currentTodos.map((item, index) => {
            return <VideoItem
            key={index}
            item={item}
        />
        });
  
      const pageNumbers = [];
      for (let i = 1; i <= Math.ceil(videos.length / todosPerPage); i++) {
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
      const {sortType} = this.state;
          const productsort = videos.sort((a, b)=>{ 
              const sapx = (sortType ==="asc") ? 1: -1;
              return sapx * b.datetime.localeCompare(a.datetime)
            })
            const videonew = productsort.map((item, index) => {
              return <VideoItem
              key={index}
              item={item}
          />
          });
        return (
            <div className='boxvideo'>
             <div id='newmenu' style={{marginLeft:"18.5%",marginTop:"30px"}}>
                <ul>
                <li id ='danhmuc'><a class="active" href="https://quantrimang.com/">DANH MỤC</a></li>
                <li>
                <form onSubmit={this.onchange}>
                <input id="inputsearch" name ='txtSearch' type='text' placeholder='Search...'></input>
                  {this.state.sear === true?(<a className='link' href ='/image'>X</a>):''}        
                  <button className='btn btn-info' id="icon" onClick={this.search}><i class="fas fa-search"></i></button>                 
                </form>
                </li>
                <li style={{color:"green"}}><p>LOẠI VIDEO>></p></li>
                    {this.state.categories.map((item,index)=>
                    <a href={'/videoCategory/'+item.id} id ='link'><li key={index}><a>{item.name}</a></li></a>
                    )} 
                 <li style={{color:"green"}}><p> VIDEO THEO TÊN >></p></li>
                <Link className='link'><li><a onClick = {this.sortByNameAsc}>Tên từ A - Z</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNameDesc}>Tên từ Z - A</a></li></Link>
                <Link className='link'><li><a onClick = {this.sortByNewDate}>Video mới nhất</a></li></Link>
                </ul>
                </div>
            <div className='videocontentbox'>
                    <div id="videocontent">
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

export default Video;