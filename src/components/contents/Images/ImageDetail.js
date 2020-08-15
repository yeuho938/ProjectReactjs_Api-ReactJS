import React, { Component } from 'react';
import {withRouter} from 'react-router';
import './Image.css';
class ImageDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageDetail: [],
            categoryImage: []
        }
        var id = props.match.params.id;
        this.getDetail(id);  
        this.getImageCate(id);
    }
    
    getDetail(id){
        fetch("http://127.0.0.1:8000/api/image/detail/" +id)
        .then(response => {
                response.json().then((data) =>  {
                    console.log(data);
                    this.setState({
                        imageDetail:data
                    })
                });
        });
 }
getImageCate(id){
    fetch("http://127.0.0.1:8000/api/image/category/" +id)
    .then(response => {
            response.json().then((data) =>  {
                console.log(data);
                this.setState({
                    categoryImage:data
                })
            });
    });   
}
    render() {
       let item = this.state.imageDetail;
        return (
            <div>
            <div id = 'containerDetailImage'>
            <div id='imdetail'>
                <div id ='image'>
                    <img src={"http://127.0.0.1:8000/storage/" + item.image} />
                </div>
                <div id ='content'>
                <h3>{item.name}</h3>
                <p>{item.datetime}</p>
                <p>{item.content}</p>
                </div>
                
            </div>
            <h2> Các hình ảnh cùng loại</h2>
            <hr />
            <div id ="imageRelax">
            {this.state.categoryImage.map((itemrelax, index)=>
            <div id ='imageAbout'>
                    <a href ={'/imagedetail/' + itemrelax.id}><img src={"http://127.0.0.1:8000/storage/" + itemrelax.image} /></a>
                    <h3>{itemrelax.name}</h3>
            </div>
             )} 
             </div>
        </div>           
        </div>
        );
    }
}

export default withRouter(ImageDetail);