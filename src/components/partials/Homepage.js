import React, { Component } from 'react';
import './Homepage.css';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
 
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
                        <div className='new_chilren'>
                            <i class="fas fa-film"></i>
                            <h3> PHIM</h3>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>
                        <div className='new_chilren'>
                            <i class="fas fa-calendar-check"></i>
                            <h3> SỰ KIỆN</h3>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>
                        <div className='new_chilren'>
                            <i class="fas fa-images"></i>
                            <h3> HÌNH ẢNH</h3>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>
                        <div className='new_chilren'>
                            <i class="fas fa-video"></i>
                            <h3> VIDEO NGẮN</h3>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>

                        </div>
                        <center><h2> CÁC VIDEO NỔI BẬT</h2></center>
                        <div className='videos'>
                            
                            <div id='videobig'>
                            <video src={'http://127.0.0.1:8000/storage/'+itemvideoOne.video} controls></video>
                            <h4>{itemvideoOne.name}</h4>
                            </div>
                            <div id ='vdeonew'>
                                {this.state.videonew.map((newvideo,index)=>
                                <div>
                                 <video src={'http://127.0.0.1:8000/storage/'+newvideo.video} controls></video>
                                 <h4>{newvideo.name}</h4>
                                 </div>
                                )}
                                <a>Xem thêm >></a>
                            </div>
                            
                        </div>
                            <center><h2> HÌNH ẢNH ĐƯỢC XEM NHIỀU</h2></center>
                        <div className="slide-images">
                            
                            <Slide>
                                {this.state.images.map((item)=>
                                    <div className="each-slide1">
                                        <div style={{'backgroundImage': `url(${"http://127.0.0.1:8000/storage/"+item.image})`,height:"300px",width:"400px"}}>
                                        </div>                                        
                                    </div>   
                                )}
                                        
                            </Slide>
                        </div>
                        <div className='newsss'>

                        </div>            
          </div>
         
        );
    }
}

export default Homepage;