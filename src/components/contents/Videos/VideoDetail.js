import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './VideoDetail.css';
class VideoDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoDetail: [],
            videonews: []
        }
        var id = props.match.params.id;
        this.getDetail(id);   
        this.getData();   
        this.onAddComment  =this.onAddComment.bind(this);
    }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/video/detail/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        videoDetail:data
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
            onAddComment(event){
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
                    alert(' Bạn đã đăng ký thành công!')
                });
            }
    render() {
       let itemvideo = this.state.videoDetail;
        return (
            <div id="deta">
            <div  id ='containerDetailvi'>
            <div id ='videoMain'>
                <div id ='videodetail'>
                <video src={'http://127.0.0.1:8000/storage/'+itemvideo.video} controls></video>
                <h3>{itemvideo.name}</h3>
                    <span id ='theloai'><p> Thể loại: {itemvideo.category_name}</p> &emsp;<p> Lượt xem: 200 lượt </p></span>
                    <p> 0 bình luận</p>
                    <div>
                    <form onSubmit={this.onAddComment}>
                    <input type='text' name='comment' />
                    <button type='submit'>add</button>
                    </form>
                </div>
                </div>
                <hr />
                <h2> Các video mới nhất</h2>
                <div className='newvideo'>
                {this.state.videonews.map((itemnew)=>
                <div id ='videonew'>
                        <video controls>
                        <video src={'http://127.0.0.1:8000/storage/'+itemnew.video} controls></video>
                        </video>
                        <h3>{itemnew.name}</h3>
                         <span id ='theloai'><p> Thể loại: {itemnew.namecate}</p><br></br> &emsp;<p> Lượt xem: 200 lượt </p></span>
                </div>
                 )}
                 </div>
            </div>
            <div id ='watchmost'>
                    <h2> Tiếp theo</h2>
                    {/* {this.state.videonews.map((itemnew)=>
                    <div class ='videomost'>
                        <div class="video">
                        <video src={'http://127.0.0.1:8000/storage/'+itemnew.video} controls></video>
                        </div>
                        <div class="contentmostvideo">
                        <h3>{itemnew.name}</h3>
                        <span id ='theloai'><p> Thể loại:{itemnew.category_name}</p><br></br> &emsp;<p> Lượt xem: 200 lượt </p></span>
                        </div>
                    </div>   
                    )}      */}
            </div>
        
        </div>
            
        </div>
        );
    }
}

export default withRouter(VideoDetail);


