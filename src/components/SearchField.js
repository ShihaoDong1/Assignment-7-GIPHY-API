import React, { Component } from 'react';
import axios from 'axios';

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
    //  console.log(randomchLink)
    axios
    .get(randomchLink + "&limit=10", {
        params: {  //_limit: 10
        }
      } 
    )
    .then((response) => {
      // data is an array containing objects
      const data = response.data;
      this.setState({ arrObj: false});
      this.setState({ randomGif: data.data.images.original.url});
      // console.log(this.state.randomGif)
      // console.log(typeof this.state.randomGif)
    })
    .catch((err) => console.log(err));

  }

  render() {
    // console.log(typeof this.state.data.data)
    // for(let i = 0; i<gifUrl.length; i++){
    //   let imgList = this.state.gifUrl[i];
    // }
    let imgList;
    if(this.state.arrObj){
      imgList = this.state.data.map((x) =>(
      <div className = 'url' key = {x}>
        <img src = {x.images.original.url} alt = {this.state.searchTerm}/>
      </div>
     ))
     }
      else  { 
        // let x = this.state.randomGif;
        console.log(this.state.randomGif)
        imgList = <img src = {this.state.randomGif} alt = "Image loading" />
      }
     


    // let imgList = this.state.data.forEach((x) => {
    //    return  <img src = {x.images.original.url} alt = {this.state.searchTerm} />
    //    //(<div className = 'url' key = {x}>
     
    //   //  </div>)
    // });

    return (
      <div>
        <h1>Gifphy Assignment: </h1>
        
        <p>
          <input type="text" placeholder="Regular Search" onChange={this.handleChange} />
          <button onClick={this.handleRegularSearch}>Search</button>
        </p>

        <p>
          {/* <input type="text" placeholder="Trending Search" onChange={this.handleChange} /> */}
          <button onClick={this.handleTrendingSearch}>Trending Search</button>
        </p>

        <p>
          {/* <input type="text" placeholder="Random Search" onChange={this.handleChange} /> */}
          <button onClick={this.handleRandomSearch}>Random Search</button>
        </p>
        <p>{imgList}</p> 
      </div>

    )
  }
}

export default SearchField

