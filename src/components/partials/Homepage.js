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
            news: []
        }     
        this.getImage(); 
        this.getNew(); 
        this.getVideo();     
    }
    
    getImage(){
        fetch("http://127.0.0.1:8000/api/admin/image/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
        this.updateImage(data);
                });
        });
    
        }  
    updateImage(data){
        this.setState({
            images: data
        })
    }
    getNew(){
        fetch("http://127.0.0.1:8000/api/admin/new/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
        this.updateNew(data);
                });
        });
    
        }  
    updateNew(data){
        this.setState({
            news: data
        })
    }
    getVideo(){
        fetch("http://127.0.0.1:8000/api/admin/video/index")
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
        this.updateVideo(data);
                });
        });
    
        }  
        updateVideo(data){
        this.setState({
            videos: data
        })
    }
    render() {
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
                        <div id='new1'>
                            <center><i class="fas fa-film"></i></center>
                            <center><h3> PHIM</h3></center>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>
                        <div id='new2'>
                            <center><i class="fas fa-calendar-check"></i></center>
                            <center><h3> SỰ KIỆN</h3></center>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>
                        <div id='new3'>
                            <center><i class="fas fa-images"></i></center>
                            <center><h3> HÌNH ẢNH MỚI NHẤT</h3></center>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>
                        <div id='new4'>
                            <center><i class="fas fa-video"></i></center>
                            <center><h3> VIDEO NGẮN</h3></center>
                            <p>Hình ảnh Bộ sưu tập Nghệ Sỹ - Ca sĩ - Cá Nhân</p>
                            <p> có thể được hiển thị dạng Gallery ảnh với hiệu ứng đẹp, hiện đại, bắt mắt.</p>
                        </div>

                        </div>
                        <div className='videos'>
                          
                        </div>

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