import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './Film.css';
import { 
    Link } 
  from "react-router-dom";
class FilmDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            filmDetail: [],
            newFilm: []
        }
        var id = props.match.params.id;
        this.getDetail(id);  
        this.getNewFilm();
        this.onAddComment = this.onAddComment.bind(this);
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
        alert(' Bạn đã đăng ký thành công!')
    });
}
    render() {
       let item = this.state.filmDetail;
        return (
            <div>
            <div id = 'containerDetailFilm'>
            <div id='filmDetail'>
                <p id ='titleFilm'>Phim / {item.name}</p>
                <div id ='image'>
                    <img src={"http://127.0.0.1:8000/storage/" + item.image} />
                    <h3>{item.name}</h3>
                      <p>{item.datetime}</p>
                </div>
                <div id ='contentFilm'>
                <h3> Nội dung phim</h3>
                <p>{item.content}</p>
                <h3> Trailer</h3>
                <video src={'http://127.0.0.1:8000/storage/' + item.video} controls></video>
                <h3> Link phim</h3>
                 <a href={item.link} style={{marginLeft:"3%"}}>{item.link}</a>
                </div>
                <div>
                <form onSubmit={this.onAddComment}>
                    <input type='text' name='comment' />
                    <button type='submit'>add</button>
                    </form>
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