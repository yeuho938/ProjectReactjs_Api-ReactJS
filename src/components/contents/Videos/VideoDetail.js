import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './VideoDetail.css';
import { 
    Link } 
  from "react-router-dom";
class VideoDetail extends Component {
    constructor(props){
        super(props);
        let user = localStorage.getItem("user_id");
        this.state = {
            videoDetail: [],
            videonews: [],
            numberLike:0,
            getdataComment: [],
            login: user,
            like:false,
            getdataLike: [],
            btnComment: false
           
        }
        var id = props.match.params.id;
        this.getDetail(id);   
        this.getData();   
        this.getAllLike(id);
        this.getAllComment(id);
        this.onAddComment  =this.onAddComment.bind(this);
        this.likeVideo = this.likeVideo.bind(this);
        this.buttonComment = this.buttonComment.bind(this);
        }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/video/detail/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        videoDetail:data,

                    })
                });
        });
        }
        getData(){
            fetch("http://127.0.0.1:8000/api/admin/video/newvideo")
            .then(response => {
                    response.json().then((data) =>  {
                        console.log(data);
                        this.setState({
                            videonews: data
                        })
                    });
            });
            }     
            getAllComment(id){
                fetch("http://127.0.0.1:8000/api/admin/video/totalComment/" +id)
                .then(response => {
                        response.json().then((data) =>  {
                            console.log(data);
                            this.setState({
                                getdataComment: data
                            })
                        });
                });
                } 
            onAddComment(event){
                if(this.state.login !=null){
                    event.preventDefault();
                    let content = event.target['comment'].value;
                    let user_id = localStorage.getItem('user_id');
                    let video_id = this.props.match.params.id;;
                    
                    let comment = {
                        video_id:video_id,
                        user_id:user_id,
                        content: content,
                    }
                
                    let postInJson = JSON.stringify(comment);
                    console.log(postInJson);
                    fetch("http://127.0.0.1:8000/api/admin/video/comment", {
                        method: "post",
                        headers: {
                            "Content-Type":"application/json"
                        },
                        body: postInJson
                    })
                    .then((response) => {
                        console.log(response);    
                        window.location.reload();                  
                    });   
                }else{
                    alert('Để comment hoặc Like bạn phải đăng nhập/đăng ký');
                    this.props.history.push("/login");
                }
                       
                  
            }
            likeVideo(event){
                if(this.state.login !=null){
                event.preventDefault();
                let user_id = localStorage.getItem('user_id');
                let video_id = this.props.match.params.id;;
                let like = {
                    video_id: video_id,
                    user_id: user_id
                }
            
                let postInJson = JSON.stringify(like);
                console.log(postInJson);
                fetch("http://127.0.0.1:8000/api/admin/video/like", {
                    method: "post",
                    headers: {
                        "Content-Type":"application/json"
                    },
                    body: postInJson
                })
                .then((response) => {
                    console.log(response); 
                    window.location.reload();                  
                    this.setState({
                        like:true
                    })
                });  
            }else{
                alert("Để Like/ Comment bạn phải đăng nhập/đăng ký");
                this.props.history.push("/login");
            }           
            }
            getAllLike(id){
                fetch('http://127.0.0.1:8000/api/admin/video/totalLike/' +id)
                .then(response => {
                    response.json().then((data) =>  {
                        console.log(data);
                        this.setState({
                            getdataLike: data
                        })
                    });
            });
            }
            buttonComment(){
                this.setState({
                    btnComment: true
                })
            }
    render() {
       let itemvideo = this.state.videoDetail;
       let getComment = this.state.getdataComment;
       let numberComment = getComment.length;

       let getAllLike = this.state.getdataLike;
       let numberLike =getAllLike.length;
     
        return (
            <div id="deta">
            <div  id ='containerDetailvi'>
            <div id ='videoMain'>
                <div id ='videodetail'>
                <video src={'http://127.0.0.1:8000/storage/'+itemvideo.video} controls></video>
                <h3>{itemvideo.name}</h3>
                    <span id ='theloai'><p> Thể loại: {itemvideo.category_name}</p> &emsp;<p> Lượt xem: 200 lượt </p></span>
                    <div>
                     &emsp; <button type="submit" onClick={this.likeVideo}><a href ={'/videodetail'}><i class="fas fa-heart" style={{fontSize:"30px"}}></i></a></button> &emsp;&emsp;&emsp;&emsp;
                    {/* <button type="submit" style={{border:"0px", background:"white"}}><i class="far fa-heart" style={{fontSize:"30px"}}></i></button> */}
                    <button type="submit" style={{border:"0px", background:"white"}} onClick={this.buttonComment}><i className="fas fa-comment" style={{fontSize:"30px"}}></i></button>
                    <span style={{display:"flex", marginTop:"10px"}}><p> {numberLike} yêu thích</p>&emsp;&emsp; <p> {numberComment}  bình luận</p></span>
                    <hr />  
                    {this.state.btnComment ===true ?(<div>                
                    <div className='comment'>
                      {getComment.map((contentComment)=>
                      <div>
                       <h3>{contentComment.content}</h3>
                       </div>
                      )}                   
                    </div>
                    <form onSubmit={this.onAddComment} method="POST">
                        <textarea placeholder='Hãy viết bình luận nào!....' name='comment'></textarea>&emsp;
                        <button type='submit'><i class="fas fa-chevron-circle-right"></i></button>
                    </form>
                    </div>):null}
                </div>
                </div>
            </div>
            <div id ='watchmost'>
                    <h2> Các video gần đây</h2>
                     {this.state.videonews.map((itemnew)=>
                    <div className ='videomost'>
                        <div className="video">
                        <a  href ={'/videodetail/'+itemnew.id}> <video src={'http://127.0.0.1:8000/storage/'+itemnew.video} controls></video></a>
                        </div>
                        <div className="contentmostvideo" style={{marginLeft:"10px"}}>
                        <h3>{itemnew.name}</h3>
                        <span id ='theloai'><p> Thể loại:{itemnew.category_name}</p><br></br> &emsp;<p> Lượt xem: 200 lượt </p></span>
                        </div>
                    </div>   
                    )}     
                    <button style={{marginLeft:"80%"}}> Xem thêm>></button> 
            </div>
        
        </div>
            
        </div>
        );
    }
}

export default withRouter(VideoDetail);


