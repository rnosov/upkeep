import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import './App.css';
import Home from './home/Home';
import NoMatch from './navigation/NoMatch';
import Header from './navigation/Header';
import Footer from './navigation/Footer';


class App extends Component {
  componentDidMount() {
    if (window.clicky)
      window.clicky.log(document.location.pathname, 'app', 'pageview');
    //Page.clicky(document.location.pathname, this.props.title, 'pageview');
    
  }

  render() {
    return (
      <div style={{ overflow: 'hidden' }}>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />            
          <Route path='/hazqrc2' render={({ match }) => <Home promo={match.url.replace(/\//g, '').toUpperCase()} />} />            
          <Route path='/hazqrc1' render={({ match }) => <Home promo={match.url.replace(/\//g, '').toUpperCase()} />} />            
          <Route component={NoMatch} />
        </Switch>
        <Footer />
        <Helmet titleTemplate="%s - Upkeep Team" />
      </div>
    );  
  }
}

if (process.env.NODE_ENV === 'production') {
  window.clicky_site_ids = window.clicky_site_ids || [];
  window.clicky_site_ids.push(101141408);
  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.async = true;
  s.src = '//static.getclicky.com/js';
  ( document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0] ).appendChild( s );
}

export default App;
