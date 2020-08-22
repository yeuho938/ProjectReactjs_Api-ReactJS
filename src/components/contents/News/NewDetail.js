import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './New.css';
class NewDetail extends Component {
    constructor(props){
        super(props);
        let user = localStorage.getItem("user_id");
        this.state = {
            newDetail: [],
            getdataComment: [],
            btnComment: false,
            getdataLike:[],
            login: user
        }
        var id = props.match.params.id;
        this.getDetail(id);  
        this.getAllComment(id);
        this.getAllLike(id);
        this.onAddComment = this.onAddComment.bind(this);    
        this.buttonComment =this.buttonComment.bind(this);
        this.likeNew =this.likeNew.bind(this);
    }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/new/detail/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        newDetail:data
                    })
                });
        });
        }
        onAddComment(event){
            if(this.state.login!=null){
            event.preventDefault();
            let content = event.target['comment'].value;
            let user_id = localStorage.getItem('user_id');
            let new_id = this.props.match.params.id;;
            
            let comment = {
                new_id:new_id,
                user_id:user_id,
                content: content,
            }
        
            let postInJson = JSON.stringify(comment);
            console.log(postInJson);
            fetch("http://127.0.0.1:8000/api/admin/new/comment", {
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
            alert("Để Like/ Comment bạn phải đăng nhập/đăng ký");
            this.props.history.push("/login");
        }   
            
        }
        getAllComment(id){
            fetch('http://127.0.0.1:8000/api/admin/new/totalComment/' + id)
            .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        getdataComment: data
                    })
                });
        });
        }
        likeNew(event){
            if(this.state.login != null){
            event.preventDefault();
            let user_id = localStorage.getItem('user_id');
            let new_id = this.props.match.params.id;;
            let like = {
                new_id: new_id,
                user_id: user_id
            }
        
            let postInJson = JSON.stringify(like);
            console.log(postInJson);
            fetch("http://127.0.0.1:8000/api/admin/new/like", {
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
            fetch('http://127.0.0.1:8000/api/admin/new/totalLike/' +id)
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
       let item = this.state.newDetail;
       let getComment = this.state.getdataComment;
       let getLike = this.state.getdataLike; 
       let totalComment = getComment.length;
       let numberLike = getLike.length;
        return (
            <div>
            <div id ='newdetail'>               
                <h3 id ='title_new'> {item.name}</h3>
                <span id ='cate_datetime'><p>{item.category_name}</p> <p id ='datetime_new'>{item.datetime}</p></span>
                <img src={"http://127.0.0.1:8000/storage/" + item.image} id ='image_new'/>
                <p id ='content_new'>{item.content}</p>
            </div>   
            <hr style={{width:"60%"}}/>     
            <div>
                <div style={{marginLeft:"20%"}}>                    
                     &emsp; <button type="submit" onClick={this.likeNew}><a href ="#"><i class="fas fa-heart" style={{fontSize:"30px"}}></i></a></button> &emsp;&emsp;&emsp;&emsp;
                    {/* <button type="submit" style={{border:"0px", background:"white"}}><i class="far fa-heart" style={{fontSize:"30px"}}></i></button> */}
                    <button type="submit" style={{border:"0px", background:"white"}} onClick={this.buttonComment}><i className="fas fa-comment" style={{fontSize:"30px"}}></i></button>
                    <span style={{display:"flex", marginTop:"10px"}}><p> {numberLike} yêu thích</p>&emsp;&emsp; <p> {totalComment}  bình luận</p></span>
                    {this.state.btnComment===true?(<div>
                    <form onSubmit={this.onAddComment}>
                    <textarea placeholder='Hãy viết bình luận nào!....' name='comment'></textarea>&emsp;
                    <button type='submit'>Đăng lên</button>
                    </form>
                    <h3>List comment</h3>
                    <p>{getComment.map((contentComment)=>
                    <p>{contentComment.content}</p>
                    )}</p>
                    </div>):null}              
                </div>
            </div>
            
        </div>
        );
    }
}

export default withRouter(NewDetail);


