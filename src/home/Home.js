import React from 'react';
import Hero from './Hero';
import Checkout from './Checkout';
import {Elements, StripeProvider} from 'react-stripe-elements';

const PUBLIC_KEY = process.env.NODE_ENV === 'production' ? 'pk_live_os3sbyDWWFTtE9jYo2wZmxFA' : 'pk_test_hSjzPzRFC3wnJD2CkT4oGmvG';

class Home extends React.Component {  

  constructor() {
    super();
    this.state = { stripe: null };
  }

  componentDidMount() {
    if (window.Stripe) {
      this.setState({ 
        stripe: window.Stripe(PUBLIC_KEY)
      });
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        this.setState({stripe: window.Stripe(PUBLIC_KEY)});
      });
    }
  }

  render() {  
    return (
      <div>
        <Hero />
        <StripeProvider stripe={this.state.stripe}>
          <Elements>
            <Checkout promo={this.props.promo}/>
          </Elements>
        </StripeProvider>        
      </div>
    );  
  }

}


export default Home;
