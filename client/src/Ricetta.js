import React from 'react';
import axios from 'axios';


import './App.css';


export default class Ricetta extends React.Component {

  state = {
    pwd:"",
    title: "",
    desc:"",
    img:"",
    ricetta: "",
    preparazione: "",
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  };


  getBlogPost = () => {
    axios.get('/api/ricetta')
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
      title: this.state.title,
      desc: this.state.desc,
      img: this.state.img,
      ricetta: this.state.ricetta,
      preparazione:this.state.preparazione
    };
    console.log(payload)

    axios({
      url: '/api/save/ricetta',
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
      url: '/api/delete/ricetta',
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
      title: "",
      desc: "",
      ricetta: "",
      img:"",
      preparazione:""
    });
  };

  displayBlogPost = (posts) => {

    if (!posts.length) return null;
    console.log(posts)
    return posts.map((post, index) => (
      <div key={index} className="blog-post__display">
        <h3>{post.title}</h3>
        <img src={post.img} style={{width:"15em",height:"20em"}} alt=""/>
        <p>{post.desc}</p>
        <h5 align="left"><strong>Ricetta</strong></h5>
        <div>
      {post.ricetta.split("\n").map((frase,index2)=>{
        return( 
          <p key={index+""+index2}>{frase}</p> 
          );
      })}
      </div>
      <h5 align="left"><strong>Preparazione</strong></h5>
        <div>
      {post.preparazione.split("\n").map((frase,index2)=>{
        return( 
          <p key={index+""+index2}>{frase}</p> 
          );
      })}
      </div>
        <button value={post._id} onClick={this.deletePost}>X</button>
      </div>
    ));
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        img: reader.result
      });
    }

    reader.readAsDataURL(file)
  }
  render() {

    console.log('State: ', this.state);
    let {img} = this.state;
    let $imagePreview = null;
    if (img) {
      $imagePreview = (<img src={img} alt=""/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    //JSX
    return(
      <div className="app">
        <h2>Crea Ricetta</h2>
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
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="descrizione"
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
              placeholder="ricetta"
              name="ricetta"
              cols="30"
              rows="10"
              value={this.state.ricetta}
              onChange={this.handleChange}
            >
            </textarea>
            </div>
            <div className="form-input">
            <textarea
              placeholder="preparazione"
              name="preparazione"
              cols="30"
              rows="10"
              value={this.state.preparazione}
              onChange={this.handleChange}
            >    
            </textarea>
            </div>
          
          <div className="form-input">
              <input name="img"
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
               <div className="imgPreview">
                  {$imagePreview}
              </div>
          </div>

          <button>Submit</button>
        </form>

        <div className="blog-">
          <h2>Lista Ricette</h2>
          {this.displayBlogPost(this.state.posts)}
        </div>
      </div>
    );
  }
}