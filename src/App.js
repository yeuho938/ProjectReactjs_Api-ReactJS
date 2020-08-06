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
import { 
  BrowserRouter as Router, 
  Switch,
  Route, 
  Link } 
from "react-router-dom";
class  App extends Component {
  constructor(){
    super();
    this.state = {
      filmCategories: [],
      imageCategories: [],
      videoCategories: [],
      newCategories: []
    }     
    this.getFilmCate();
    this.getImageCate();    
    this.getVideoCate();
    this.getNewCate();   
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
render(){
  return (
    <Router>
        <div className="wrapper">
        <nav className="menu">
            <ul className="clearfix">
            <li><a href="#"><Link to = '/home' className='chu'> Trang chủ</Link></a></li>
            <li>
                <a href="#"><Link to = '/film' className='chu'> Phim</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.filmCategories.map((item,index)=>
                <Link to={'/filmCategory/'+item.id}><li><a>{item.name}</a></li></Link>
                  )}
                </ul>
            </li>
            <li>
                <a href="#"><Link to = '/image' className='chu'> Ảnh</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.imageCategories.map((item,index)=>
                <Link to={'/imageCategory/'+item.id}><li><a>{item.name}</a></li></Link>
                  )}
                </ul>
            </li>
            <li>
                <a href="#"><Link to = '/video' className='chu'> Video</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.videoCategories.map((item,index)=>
                <Link to={'/videoCategory/'+item.id}><li><a>{item.name}</a></li></Link>
                  )}
                </ul>
            </li>
            <li>
                <a href="#"><Link to = '/new' className='chu'> Tin tức</Link> <span className="arrow">▼</span></a>
                <ul className="sub-menu">
                {this.state.newCategories.map((item,index)=>
                <Link to={'/newCategory/'+item.id}><li><a>{item.name}</a></li></Link>
                  )}
                </ul>
            </li>       
            <li><a href="#">Liên hệ</a></li>
            <li><a href="#"><Link to = '/login' className='chu'> Đăng nhập</Link></a></li>
            <li><a href="#"><Link to = '/register' className='chu'> Đăng ký</Link></a></li>
            <li><a href="#"><Link to = '/user' className='chu'> User</Link></a></li>
            </ul>
        </nav>
      </div>
      <Switch>
          <Route path='/home'> 
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
          <Route path={'/imageCategory/:id'} exact> 
            <ImageCategory />
          </Route>
          <Route path={'/filmCategory/:id'} exact> 
            <FilmCategory />
          </Route>
          <Route path={'/videoCategory/:id'} exact> 
            <VideoCategory />
          </Route>
          <Route path={'/newCategory/:id'} exact> 
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
    </Switch>
    <div>
      <Footer />
    </div>
 </Router>
  );
}
}

export default App;