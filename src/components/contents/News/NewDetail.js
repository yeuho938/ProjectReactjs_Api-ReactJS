import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './New.css';
class NewDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            newDetail: []
        }
        var id = props.match.params.id;
        this.getDetail(id);  
        this.onAddComment = this.onAddComment.bind(this);    
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
                alert(' Bạn đã đăng ký thành công!')
            });
        }
    render() {
       let item = this.state.newDetail;
        return (
            <div>
            <div id ='newdetail'>               
                <h3 id ='title_new'> {item.name}</h3>
                <span id ='cate_datetime'><p>{item.category_name}</p> <p id ='datetime_new'>{item.datetime}</p></span>
                <img src={"http://127.0.0.1:8000/storage/" + item.image} id ='image_new'/>
                <p id ='content_new'>{item.content}</p>
            </div>        
            <div>
                <div>
                    <form onSubmit={this.onAddComment}>
                    <input type='text' name='comment' />
                    <button type='submit'>add</button>
                    </form>
                </div>
            </div>
            
        </div>
        );
    }
}

export default withRouter(NewDetail);


