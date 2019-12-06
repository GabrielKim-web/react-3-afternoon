import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  //The base API for this application is https://practiceapi.devmountain.com/api/
  //for grabbing posts
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts").then( (results) => {
      //console.log(results) returns an object with properties config, data, headers, and request. I most likely want the data.
      this.setState({ posts: results.data });
    }).catch( (err) => {
      console.log(err);
    })
  }

  //for updating posts (edit?)
  updatePost(id, text) {
    //after grabbing the results, we want to set the state of the posts array to the updated post
    //since we want to update the text of a certain post, we need to specify the id to access in the API then update it with that text
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text}).then( (results) => {
      this.setState({posts: results.data});
    }).catch((err) => console.log(err));
  }

  //for deleting posts
  deletePost(id) {
    //deleting a certain post requires the ID of that post you want to delete
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then( (results) => {
      this.setState({posts: results.data});
    }).catch((err) => console.log(err));
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts/`, {text}).then( (results) => {
      this.setState({posts: results.data});
    }).catch((err) => console.log(err));
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose 
          createPostFn={this.createPost}
          />
          {/* for each post in the post state (which has an array), we invoke the Post component) */}
          {console.log(posts)};
          {posts.map((element) => <Post
          key={element.id}
          text={element.text}
          date={element.date}
          id={element.id}
          updatePostFn={this.updatePost}
          deletePostFn={this.deletePost}
          />
          )}
          
        </section>
      </div>
    );
  }
}

export default App;
