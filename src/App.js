import React, { Component } from 'react';
import Helmet from 'react-helmet';


import Home from './home/Home';
import NoMatch from './navigation/NoMatch';
import Header from './navigation/Header';
import Footer from './navigation/Footer';

import history from './navigation/history';
 
import './App.css';

const PAGES = {
    '/': Home,
    '/hazqrc1/': Home, /*QR code*/
    '/hazqrc2/': Home, /*Leaflet*/
    '/hazqrc3/': Home, /*No deposit*/
};


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        pathname: props.pathname,
    };
  }

  componentDidMount() {              
    history.onChange((pathname) => {
        this.setState({pathname});
    });
  }

  render() {
    const Handler = PAGES[this.state.pathname] || PAGES[this.state.pathname+'/'] || NoMatch;
    return(
      <div style={{ overflow: 'hidden' }}>
        <Header />
          <Handler promo={this.state.pathname.replace(/\//g, '').toUpperCase()} />
        <Footer />
        <Helmet titleTemplate="%s - Upkeep Team" />
      </div>
    )
  }
}

export default App;
