import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import axios from 'axios';

import './css/index.css';
import apiKey from './config.js';
import Header from './components/Header.js';
import Gallery from './components/Gallery.js';
import SearchForm from './components/SearchForm.js';
import NotFound from './components/NotFound.js';




export default class App extends Component {

  constructor(){
    super();
    this.state = {
      pics: [],
      mountains: [],
      lakes: [],
      canyons: [],
      loading: true
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.performSearch();
    this.performSearch('mountains');
    this.performSearch('lakes');
    this.performSearch('canyons');
  }

  performSearch = (query) => {
    this.setState({loading: true});
    console.log(this.state.loading)
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        if (this._isMounted) {
          if (query === 'mountains') {
            this.setState({ mountains : response.data.photos.photo,
                            loading : false })
          } else if (query === 'lakes'){
            this.setState({ lakes: response.data.photos.photo,
                            loading: false})
          } else if (query === 'canyons') {
            this.setState({ canyons: response.data.photos.photo,
                            loading: false})
          } else {
            this.setState({ pics : response.data.photos.photo,
                            loading: false})
          }
        }
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  render() {
    console.log(this.state.pics);
      return (
        <BrowserRouter>
          <div>
            <Header />
              <p>Search below for more picture options</p>
              <Route
                render={props =>
                <SearchForm {...props} onSearch={this.performSearch} /> } />
                  <Switch>
                    <Route exact path="/" render={ () => <Redirect to="mountains" /> } />
                    <Route exact path="/search/:query" render={ ({ match }) => (this.state.loading) ? <p>Loading...</p> : <Gallery data={this.state.pics} /> } />
                    <Route exact path="/mountains" render={ () => <Gallery data={this.state.mountains} query="mountains" /> } />
                    <Route exact path="/lakes" render={ () => <Gallery data={this.state.lakes} query="lakes" /> } />
                    <Route exact path="/canyons" render={ () => <Gallery data={this.state.canyons} query="canyons" /> } />
                    <Route component={ NotFound } />
                  </Switch>
            </div>
          </BrowserRouter>
      );
    }
  }
