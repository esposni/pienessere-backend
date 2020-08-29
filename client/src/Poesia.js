import React from 'react';
import axios from 'axios';


import './App.css';


export default class Poesia extends React.Component {

  state = {
    pwd:"",
    intro: '',
    desc:"",
    poesia: "",
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };


  getBlogPost = () => {
    axios.get('/api/poesia')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log('Data has been received!!');
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };


  submit = (event) => {
    event.preventDefault();
    
    const payload = {
      pwd: this.state.pwd,
      intro: this.state.intro,
      desc: this.state.desc,
      poesia: this.state.poesia
    };
    console.log(payload)

    axios({
      url: '/api/save/poesia',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
        alert("Insert the password")
      });;
  };

  deletePost = (event)=>{  
    event.preventDefault();
    const payload = {
      pwd: this.state.pwd,
      _id: event.target.value
    };
    axios({
      url: '/api/delete/poesia',
      method: 'DELETE',
      data: payload
    })
      .then(() => {
        console.log('Post removed');
        this.resetUserInputs();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
        alert("Insert the password")
      });;
    // console.log(event.target.value);
  };


  resetUserInputs = () => {
    this.setState({
      pwd:"",
      intro: '',
      desc:"",
      poesia: "",
    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;
    // console.log(posts[0].poesia.split("\n"))

    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{`"`+post.intro+`"`}</h3>
        <p>{post.desc}</p>
        <div align="center">
      {post.poesia.split("\n").map((frase,index2)=>{
        return( 
          <p key={index+""+index2}>{frase}</p> 
          );
      })}
      </div>
        <button value={post._id} onClick={this.deletePost}>X</button>
      </div>
    ));
  };

  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <h2>Crea Poesia</h2>
        <form onSubmit={this.submit}>
          <div className="form-input">
          <input 
              type="text"
              name="pwd"
              placeholder="password"
              value={this.state.pwd}
              onChange={this.handleChange}
            />
            <input 
              type="text"
              name="intro"
              placeholder="intro"
              value={this.state.intro}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="desc"
              name="desc"
              cols="30"
              rows="10"
              value={this.state.desc}
              onChange={this.handleChange}
            >
              
            </textarea>
          </div>
          <div className="form-input">
            <textarea
              placeholder="poesia"
              name="poesia"
              cols="30"
              rows="10"
              value={this.state.poesia}
              onChange={this.handleChange}
            >
              
            </textarea>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
        <h2>Lista Poesie</h2>
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}