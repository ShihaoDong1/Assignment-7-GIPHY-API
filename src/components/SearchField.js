import React, { Component } from 'react';
import axios from 'axios';

class SearchField extends Component {
  constructor (props){
    super(props);
    this.state = {
      imgLoad: null,
      searchTerm: null,
      API_Key: '&api_key=Y3gKxeNuyrgxRoDhBubClBALroKAG017',
      url1: "",
      dataArray: [],

    }
  }

  componentDidMount(){
    
    // console.log(this.state.url1);

    axios
      .get('http://api.giphy.com/v1/gifs/search?q='+this.state.searchTerm + this.state.API_Key, {   params: {
        _limit: 10
       }
  })
      .then((response) => {
        const data = response.data;
        console.log(data)
        this.setState({dataArray:data});
        console.log(data.data[0].type);
  
      })
      .catch((err) => console.log(err));

  }

  handleRegularSearch = (event) => {
    // this.state.
    this.setState({searchTerm: event.target.value});
    const regularLink =  'http://api.giphy.com/v1/gifs/search?q='+this.state.searchTerm + this.state.API_Key;
    this.setState({url1: regularLink})
    console.log(regularLink);

    

      // console.log(this.setState({city: data[0].City}))
      // console.log(data);

    }
  

  handleTrendingSearch = () => {
    
    const trendingLink =  'http://api.giphy.com/v1/gifs/trending?'+ this.state.API_Key;
    console.log(trendingLink);
  }

  handleRandomSearch = () => {
    const randomchLink = 'http://api.giphy.com/v1/gifs/random?' + this.state.API_Key;
    console.log(randomchLink)
  }

  handleChange = (event) => {
    this.setState({searchTerm: event.target.value})
  }

  render(){
    return( <div>
      <p>
      <input type = 
      "text" placeholder = "Regular Search" onChange = {this.handleChange}/><button onClick = {this.handleRegularSearch}>Search</button>
      </p>
      <p>
      <button onClick = {this.handleTrendingSearch}>Trending Search</button>
      </p>
      <button onClick = {this.handleRandomSearch}>Random Search</button>
    </div>
    )
  }
}


export default SearchField

