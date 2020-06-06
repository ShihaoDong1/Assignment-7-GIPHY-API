import React, { Component } from 'react';
import axios from 'axios';
//import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './searchfield.css';

class SearchField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gifUrl: [],
      searchTerm: null,
      API_Key: '&api_key=Y3gKxeNuyrgxRoDhBubClBALroKAG017',
      data: [],
      arrObj: false,
      randomGif: null,
      randomClicked: false,
    }
  }

  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value })
  }

  handleRegularSearch = (event) => {
    // when user clicks "search" button, this handler will execute and send a response to API
    // retrieves API data

    // request info from API with a constraint of 10 results
    axios
      .get('http://api.giphy.com/v1/gifs/search?q=' + this.state.searchTerm + this.state.API_Key + "&limit=10", {
          params: {  //_limit: 10
          }
        } 
      )
      .then((response) => {
        
        // data is an array containing objects
        const data = response.data;

        this.setState({ arrObj: true});
        this.setState({ data: data.data}); // transforming data into array
        console.log(data)
        console.log(typeof data)

        // grabs a random integer from 0 to 9 so we can pick a random gif object from our 10 results
        // let randomGif = Math.floor(Math.random() * 10);
        // console.log(randomGif);

        // assign the variables we need
        for(let i = 0; i < 10; i++){
        this.setState({ gifUrl: data.data[i].images.original})
        console.log(this.state.gifUrl);
        }
      })
      .catch((err) => console.log(err));
  }


  handleTrendingSearch = () => {
    const trendingLink = 'http://api.giphy.com/v1/gifs/trending?' + this.state.API_Key;
    console.log(trendingLink);
    axios
      .get(trendingLink + "&limit=10", {
          params: {  //_limit: 10
          }
        } 
      )
      .then((response) => {
        // data is an array containing objects
        const data = response.data;
        this.setState({ arrObj: true});
        this.setState({ data: data.data});
        // console.log(data)
        // console.log(typeof data)
      })
      .catch((err) => console.log(err));
  
  }

  handleRandomSearch = () => {
    const randomchLink = 'http://api.giphy.com/v1/gifs/random?' + this.state.API_Key;
    axios
    .get(randomchLink + "&limit=10", {
        params: {  //_limit: 10
        }
      } 
    )
    .then((response) => {
      const data = response.data;
      this.setState({ arrObj: false});
      this.setState({ randomGif: data.data.images.original.url});
      this.setState({ randomClicked: true });
    })
    .catch((err) => console.log(err));

  }

  render() {
    let imgList;
    if(this.state.arrObj){
      imgList = this.state.data.map((x) =>(
      // <div className = 'url' key = {x}>
        <img src = {x.images.original.url} alt = {this.state.searchTerm} width="500" height="500"/>
      // </div>
     ))
     }
      else if (this.state.arrObj !== true && this.state.randomClicked) { 
        console.log(this.state.randomGif)
        imgList = <img src = {this.state.randomGif} width="500" height="500"/>
      }

    return (
      <div className="container_class">
        <header>Gifphy Assignment</header>
        
        <p className = "phrase_container">

          <input className="search_bar" type="text" placeholder="Enter a phrase" onChange={this.handleChange} />
          <br></br>
          <button className="search_btn" onClick={this.handleRegularSearch}>Search</button>

        </p>

        <p className="trend_random_search">

          <button className="trending_btn" onClick={this.handleTrendingSearch}>Trending Search</button>
          <button className="random_btn" onClick={this.handleRandomSearch}>Random Search</button>

        </p>

        <p>{imgList}</p> 
      </div>

    )
  }
}

export default SearchField

