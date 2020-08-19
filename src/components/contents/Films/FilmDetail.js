import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './Film.css';
import { 
    Link } 
  from "react-router-dom";
class FilmDetail extends Component {
    constructor(props){
        super(props);
        let user = localStorage.getItem("user_id");
        this.state = {
            filmDetail: [],
            newFilm: [],
            getdataComment:[],
            login:user,
            getdataLike:[]
        }
        var id = props.match.params.id;
        this.getDetail(id);  
        this.getNewFilm();
        this.getAllComment(id);
        this.getAllLike(id);
        this.onAddComment = this.onAddComment.bind(this);
        this.likeFilm = this.likeFilm.bind(this);
    }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/film/detail/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        filmDetail :data,                  
                    })
                });
        });
 }
 getNewFilm(){
    fetch("http://127.0.0.1:8000/api/admin/film/newFilm")
    .then(response => {
            response.json().then((data) =>  {
                console.log(data);
                this.setState({
                    newFilm: data
                })
            });
    });   
}
onAddComment(event){
    if(this.state.login !=null){
    event.preventDefault();
    let content = event.target['comment'].value;
    let user_id = localStorage.getItem('user_id');
    let film_id = this.props.match.params.id;;
    
    let comment = {
        film_id:film_id,
        user_id:user_id,
        content: content,
    }

    let postInJson = JSON.stringify(comment);
    console.log(postInJson);
    fetch("http://127.0.0.1:8000/api/admin/film/comment", {
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
    alert("Để comment/ Like bạn phải đăng nhập. đăng ký");
    this.props.history.push("/login");
}
}
getAllComment(id){
    fetch('http://127.0.0.1:8000/api/admin/film/totalComment/' + id)
    .then(response => {
        response.json().then((data) =>  {
            console.log(data);
            this.setState({
                getdataComment: data
            })
        });
});
}
likeFilm(event){
    if(this.state.login!=null){
    event.preventDefault();
    let user_id = localStorage.getItem('user_id');
    let film_id = this.props.match.params.id;;
    let like = {
        film_id: film_id,
        user_id: user_id
    }

    let postInJson = JSON.stringify(like);
    console.log(postInJson);
    fetch("http://127.0.0.1:8000/api/admin/film/like", {
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
    fetch('http://127.0.0.1:8000/api/admin/film/totalLike/' +id)
    .then(response => {
        response.json().then((data) =>  {
            console.log(data);
            this.setState({
                getdataLike: data
            })
        });
});
}
    render() {
       let item = this.state.filmDetail;
       let getLike = this.state.getdataLike;
       let numberLike = getLike.length;
       let commentContent = this.state.getdataComment;
       let totalComment = commentContent.length;
        return (
            <div>
            <div id = 'containerDetailFilm'>
            <div id='filmDetail'>
                <p id ='titleFilm'>Phim / {item.name}</p>
                <div id ='image'style={{display:"flex",marginLeft:"0px"}}>
                    <div className='img'>
                    <img src={"http://127.0.0.1:8000/storage/" + item.image} />
                    </div>
                   <div className='cont' style={{marginLeft:"20px"}}>
                   <h3>{item.name}</h3>
                    <p><b> Thể loại:</b> {item.category_name}</p>
                    <p> <b>Năm sản xuất:</b> {item.datetime}</p>
                    <p> <b>Trạng thái:</b> {item.status}</p>
                    <p> <b>Nội dung:</b> {item.content}</p>
                    <p> <b>Link phim:</b>  <a href={item.link} style={{marginLeft:"3%"}}>{item.link}</a></p>
                   </div>
                   
                </div>
                <div id ='contentFilm'>                
                <h3> Trailer</h3>
                <video src={'http://127.0.0.1:8000/storage/' + item.video} controls></video>              
                </div>
                <div>
                    <hr />
                    &emsp; <button type="submit" onClick={this.likeFilm}><a href ="#"><i class="fas fa-heart" style={{fontSize:"30px"}}></i></a></button> &emsp;&emsp;&emsp;&emsp;
                    {/* <button type="submit" style={{border:"0px", background:"white"}}><i class="far fa-heart" style={{fontSize:"30px"}}></i></button> */}
                    <button type="submit" style={{border:"0px", background:"white"}} onClick={this.buttonComment}><i className="fas fa-comment" style={{fontSize:"30px"}}></i></button>
                    <span style={{display:"flex", marginTop:"10px"}}><p> {numberLike} yêu thích</p>&emsp;&emsp; <p> {totalComment}  bình luận</p></span>
                <form onSubmit={this.onAddComment}>
                    <textarea placeholder='Hãy viết bình luận nào!....' name='comment'></textarea>&emsp;
                    <button type='submit'>add</button>
               </form>
               <div>
               {this.state.getdataComment.map((contentComment)=>
                      <div>
                       <h3>{contentComment.content}</h3>
                       </div>
                      )}
               </div>
               
                </div>
            </div>
            <h2> Các bộ phim mới nhất</h2>
            <hr />
            <div id ="imageRelax">
            {this.state.newFilm.map((itemrelax, index)=>
            <div id ='imageAbout'>
                    <a href ={'/filmdetail/' + itemrelax.id}> <img src={"http://127.0.0.1:8000/storage/" + itemrelax.image} id='img' /></a>
                    <h3>{itemrelax.name}</h3>
            </div>
             )} 
             </div>
        </div>           
        </div>
        );
    }
}

export default withRouter(FilmDetail);