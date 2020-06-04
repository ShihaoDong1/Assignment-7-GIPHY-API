import React, { Component } from 'react';
// import Axios from 'axios';


class SearchField extends Component {
  constructor (props){
    super(props);
    this.state = {
      imgLoad: null,
      searchTerm: null,
      API_Key: '&api_key=Y3gKxeNuyrgxRoDhBubClBALroKAG017'
    }
  }
  
  handleRegularSearch = (event) => {
    // this.state.
    this.setState({searchTerm: event.target.value});
    const regularLink =  'http://api.giphy.com/v1/gifs/search?q='+this.state.searchTerm + this.state.API_Key;
    console.log(regularLink);
  }

  handleTrendingSearch = () => {
    
    const trendingLink =  'http://api.giphy.com/v1/gifs/trending?'+ this.state.API_Key;
    console.log(trendingLink);
  }
  handleRandomSearch = () => {
    const randomchLink = 'http://api.giphy.com/v1/gifs/random?' + this.state.API_Key;
    console.log(randomchLink)
  }

  render(){
    
    return <div>
      <p>
      <input type = "text" placeholder = "Regular Search" onChange = {this.handleRegularSearch}/><button onClick = {this.handleRegularSearch}>Search</button>
      </p>
      <p>
      <button onClick = {this.handleTrendingSearch}>Trending Search</button>
      </p>
      <button onClick = {this.handleRandomSearch}>Random Search</button>
    </div>
    
  }
}


export default SearchField

