import React, { Component } from 'react';
import './App.css';
import Footer from './components/partials/Footer';
 import Homepage from './components/partials/Homepage';
import Header from './components/partials/Header';
 import Film from './components/contents/Films/Film';
import Image from './components/contents/Images/Image';
import Video from './components/contents/Videos/Video';
import New from './components/contents/News/New';
import './components/partials/Header.css';
import Login from './components/auths/Login';
import Register from './components/auths/Register';
import User from './components/contents/Users/User';
import ImageCategory from './components/contents/Images/ImageCategory';
import FilmCategory from './components/contents/Films/FilmCategory';
import VideoCategory from './components/contents/Videos/VideoCategory';
import NewCategory from './components/contents/News/NewCategory';
import NewDetail from './components/contents/News/NewDetail';
import VideoDetail from './components/contents/Videos/VideoDetail';
import ImageDetail from './components/contents/Images/ImageDetail';
import FilmDetail from './components/contents/Films/FilmDetail';
import Introduce from './components/Introduce';
import { 
  BrowserRouter as Router, 
  Switch,
  Route, 
  Link } 
from "react-router-dom";
class  App extends Component {
  constructor(){
    super();
    let user = localStorage.getItem("user_id");
    let login = user?true:false;
    this.state = {
      filmCategories: [],
      imageCategories: [],
      videoCategories: [],
      newCategories: [],
      login: user
    }     
    this.getFilmCate();
    this.getImageCate();    
    this.getVideoCate();
    this.getNewCate();  
    this.logOut=this.logOut.bind(this);
}

getImageCate(){
    fetch("http://127.0.0.1:8000/api/image/category")
    .then(response => {
            response.json().then((data) =>{
                console.log(data);
                this.setState({
                  imageCategories: data 
              })
            });
    });
}  
getFilmCate(){
  fetch("http://127.0.0.1:8000/api/admin/film/category")
  .then(response => {
          response.json().then((data) =>{
              console.log(data);
              this.setState({
                filmCategories: data 
            })
          });
  });
  }  
  getVideoCate(){
    fetch("http://127.0.0.1:8000/api/video/category")
    .then(response => {
            response.json().then((data) =>{
                console.log(data);
                this.setState({
                  videoCategories: data 
              })
            });
    });
    }  
    getNewCate(){
      fetch("http://127.0.0.1:8000/api/new/category")
      .then(response => {
              response.json().then((data) =>{
                  console.log(data);
                  this.setState({
                    newCategories: data 
                })
              });
      });
      }  
      logOut(){
        localStorage.removeItem("user_id");
        this.setState({
          login: []
       })
      }
render(){
  return (
    <Router>
        <div className="wrapper">
        <nav className="menu">
            <ul className="clearfix">
            <li><a href="#"><Link to = '/' className='chu'> Trang chủ</Link></a></li>
            <li>
                <a href="#"><Link to = '/film' className='chu'> Phim</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.filmCategories.map((item,index)=>
                <a href={'/filmCategory/'+item.id}><li><a>{item.name}</a></li></a>
                  )}
                </ul>
            </li>
            <li>
                <a href="#"><Link to = '/image' className='chu'> Ảnh</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.imageCategories.map((item,index)=>
                <a href={'/imageCategory/'+item.id}><li><a>{item.name}</a></li></a>
                  )}
                </ul>
            </li>
            <li>
                <a href="#"><Link to = '/video' className='chu'> Video</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.videoCategories.map((item,index)=>
                <a href={'/videoCategory/'+item.id}><li><a>{item.name}</a></li></a>
                  )}
                </ul>
            </li>
            <li>
                <a href="#"><Link to = '/new' className='chu'> Tin tức</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.newCategories.map((item,index)=>
                <a href={'/newCategory/'+item.id}><li><a>{item.name}</a></li></a>
                  )}
                </ul>
            </li>       
            <li><a href="/introduce">Giới thiệu</a></li>
            {this.state.login?( <div className='login'>
            <li><a type='submit' href='/' onClick={this.logOut} >Log Out</a></li>
             <li><a href="#"><Link to = '/user' className='chu'> Your Profile</Link></a></li>
            </div>):(<div className='login'>
            <li><a href="#"><Link to = '/login' className='chu'> Đăng nhập</Link></a></li>
            <li><a href="#"><Link to = '/register' className='chu'> Đăng ký</Link></a></li></div>)}
           
            </ul>
        </nav>
      </div>
      <Switch>
          <Route path='/' exact> 
            <Homepage />
          </Route>

          <Route path='/film'>
            <Film />
          </Route>

          <Route path='/image' exact> 
            <Image />
          </Route>
          <Route path='/video' exact> 
            <Video />
          </Route>
          <Route path='/new' exact> 
            <New />
          </Route>
          <Route path='/login' exact> 
            <Login />
          </Route>
          <Route path='/register' exact> 
            <Register />
          </Route>
          <Route path='/user' exact> 
            <User />
          </Route>
          <Route path={'/imageCategory/:id'} > 
            <ImageCategory />
          </Route>
          <Route path={'/filmCategory/:id'} > 
            <FilmCategory />
          </Route>
          <Route path={'/videoCategory/:id'} > 
            <VideoCategory />
          </Route>
          <Route path={'/newCategory/:id'} > 
            <NewCategory />
          </Route>
          <Route path={'/newdetail/:id'} exact> 
            <NewDetail />
          </Route>   
          <Route path={'/videodetail/:id'} exact> 
            <VideoDetail />
          </Route>   
          <Route path={'/imagedetail/:id'} exact> 
            <ImageDetail />
          </Route>   
          <Route path={'/filmdetail/:id'} exact> 
            <FilmDetail />
          </Route>  
          <Route path='/introduce' exact> 
            <Introduce />
          </Route>         
    </Switch>
    <div>
      <Footer />
    </div>
 </Router>
  );
}
}

export default App;
