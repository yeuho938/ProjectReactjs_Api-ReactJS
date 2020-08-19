import React, { Component } from 'react';
import './Homepage.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { 
    Link } 
  from "react-router-dom";
const slideImages = [
  'image/sukien1.jpg',
  'image/sukien1.2.jpg',
  'image/sukien1.10.jpg',
  'image/quangcao1.jpg',
  'image/sukien1.5.jpg',
  'image/sukien1.7.jpg'
];

class Homepage extends Component {
    constructor(){
        super();
        this.state = {
            images: [],
            videos: [],
            news: [],
            videoOne:[],
            videonew:[]
        }     
        this.getImage(); 
        this.getNew(); 
        this.getVideo();     
        this.getOnevideo();
        this.videonew();
    }
    
    getImage(){
        fetch("http://127.0.0.1:8000/api/admin/image/newimage")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        images: data
                    })
                });
        });
        }  
        videonew(){
            fetch("http://127.0.0.1:8000/api/admin/video/newvideo")
            .then(response => {
                    response.json().then((data) =>  {
                        console.log(data);
                        this.setState({
                            videonew: data
                        })
                    });
            });
            }  
        getOnevideo(){
            fetch("http://127.0.0.1:8000/api/admin/video/getone")
            .then(response => {
                    response.json().then((data) =>  {
                        console.log(data);
                        this.setState({
                            videoOne: data
                        })
                    });
            });
        
            }  

    getNew(){
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
    getVideo(){
        fetch("http://127.0.0.1:8000/api/admin/video/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        videos: data
                    })
                });
        });
    
        }  
    render() {
        let itemvideoOne = this.state.videoOne;
        return (
            <div className='containerb'>
                 <div className="slide-container">
                     <div className='slide'>
                    <Slide>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[0]})`,height:"600px"}}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[1]})`,height:"600px"}}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[2]})`,height:"600px"}}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[3]})`,height:"600px"}}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[4]})`,height:"600px"}}>
                        </div>
                    </div>
                    <div className="each-slide">
                        <div style={{'backgroundImage': `url(${slideImages[5]})`,height:"600px"}}>
                        </div>
                    </div>
                    </Slide>
                    </div>
                 </div>
                   <div id="news">                       
                        </div>
                        <marquee><h1 className='txtelegantshadow'> NGỒI NHÀ NHỎ CỦA TIỂU HẦU TỬ</h1></marquee>
                        <center><h2> VIDEO NỔI BẬT</h2></center>
                        <div className='videos'>                           
                            <div id='videobig'>
                            <Link to ={'/videodetail/' + itemvideoOne.id}><video src={'http://127.0.0.1:8000/storage/'+itemvideoOne.video} controls></video></Link>
                            <h4 style={{marginLeft:"35%"}}>{itemvideoOne.name}</h4>
                            </div>
                            <div id ='vdeonew'>
                                {this.state.videonew.map((newvideo,index)=>
                                <div>
                                  <Link to ={'/videodetail/' + newvideo.id}><video src={'http://127.0.0.1:8000/storage/'+newvideo.video} controls></video></Link>
                                 <h4>{newvideo.name}</h4>
                                 </div>
                                )}                               
                            </div>
                            <a href='/video'>Xem thêm >></a>
                            
                        </div>
                            <center><h2> HÌNH ẢNH GẦN ĐÂY NHẤT</h2></center>
                        <div className="slide-images">                           
                                {this.state.images.map((item)=>
                                    <div className="eachImage" >
                                        <Link to ={'/imagedetail/' + item.id}><img src={' http://127.0.0.1:8000/storage/'+item.image} />  </Link>                                 
                                    </div>   
                                )}     
                                <a href='/image'>Xem thêm >></a>                                  
                        </div>
                        <div className='newsss'>

                        </div>            
          </div>
         
        );
    }
}

export default Homepage;