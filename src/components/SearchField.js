import React, { Component } from 'react';
import axios from 'axios';

class SearchField extends Component {
  constructor() {
    super();
    this.state = {
      gifUrl: "",
      searchTerm: null,
      API_Key: '&api_key=Y3gKxeNuyrgxRoDhBubClBALroKAG017',
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

        console.log(data)

        // grabs a random integer from 0 to 9 so we can pick a random gif object from our 10 results
        let randomGif = Math.floor(Math.random() * 10);
        console.log(randomGif);

        // assign the variables we need
        this.setState({ gifUrl: data.data[randomGif].images.original.url})
        console.log(this.state.gifUrl);

      })
      .catch((err) => console.log(err));
  }


  handleTrendingSearch = () => {
    const trendingLink = 'http://api.giphy.com/v1/gifs/trending?' + this.state.API_Key;
    console.log(trendingLink);
  }

  handleRandomSearch = () => {
    const randomchLink = 'http://api.giphy.com/v1/gifs/random?' + this.state.API_Key;
    console.log(randomchLink)
  }

  render() {
    return (
      <div>

        <p>
          <input type="text" placeholder="Regular Search" onChange={this.handleChange} />
          <button onClick={this.handleRegularSearch}>Search</button>
        </p>

        <p>
          <input type="text" placeholder="Trending Search" onChange={this.handleChange} />
          <button onClick={this.handleTrendingSearch}>Trending Search</button>
        </p>

        <p>
          <input type="text" placeholder="Random Search" onChange={this.handleChange} />
          <button onClick={this.handleRandomSearch}>Random Search</button>
        </p>

      </div>

    )
  }
}

export default SearchField

