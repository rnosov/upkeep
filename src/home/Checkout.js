import React from 'react';
import SimpleForm from '../Form';
import Order from './Order';
import Success from './Success';
//import Address from './Address';
import {CardElement, injectStripe} from 'react-stripe-elements';
//import Fade from 'react-reveal/Fade';
		 
const URL = 'https://wt-b1108527407c651ec1f59a9903841152-0.sandbox.auth0-extend.com/webtask' +
						'?mode=' + (process.env.NODE_ENV === 'production' ? 'live' : 'test');

const URL2 = 'https://wt-b1108527407c651ec1f59a9903841152-0.sandbox.auth0-extend.com/customer' +
            '?mode=' + (process.env.NODE_ENV === 'production' ? 'live' : 'test');

class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {      
      error: null,
      success: false,
      message: '',
      processing: false,
    };
    this.handleQuote = this.handleQuote.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleQuote(event) {
    this.setState({quote: event.target.value});
  }

  async submit(hasErrors) {
    if (hasErrors)
        return this.setState({ message: 'There were some errors found in the form above. Please correct them and submit this form again. ' });    
    let {token, error} = await this.props.stripe.createToken({
      name: this.props.data.name,
      address_line1: this.props.data.address1,
      address_line2: this.props.data.address2,
      address_city: 'London',
      address_zip: this.props.data.postcode,
      address_country: 'GB',
    });    
    if (token && !error) {
      let response = await fetch(this.props.noDeposit ? URL2 : URL, {
        method: "POST",
        headers: {'Content-Type': 'text/plain'},
        body: JSON.stringify({ source: token.id, promo: this.props.promo, ...this.props.data }),
      });
      //if (response.status < 200 || response.status >= 300)      
      //  this.setState({ error: response.status });
      let body = await response.json();
      if (response.status === 200)
        this.setState({ message: body.message, success: true });  
      this.setState({ message: body.message });
    }
    else 
      this.setState({ message: (error ? error.message : null) });  
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ message: 'Processing payment' });
    if (!this.props.stripe)
      return this.setState({ message: 'Couldn\'t load Stripe' });
    this.props.validate(this.submit);
  }

  render() {
    if (this.state.success)
      return <Success message={this.state.message} />;
  	const { data, promo, makeField, noDeposit } = this.props;
  	const 
      enabled = data.quote >= 10 && data.quote <= 1000,
      quote = ((Math.round( enabled ? data.quote : 0)* 100)/100)||0,
      discount = (promo ? Math.round(quote * 15)/100 : 0)||0,
      total = (quote - discount)||0,
  		deposit = enabled && !noDeposit ?  5.00 : 0,
  		balance = total - deposit;
    return (
      <form onSubmit={this.handleSubmit} className="needs-validation" noValidate>
        <div className="container mt-4">        
          <div className="row">         
            <Order quote={quote} promo={promo} discount={discount} total={total} balance={balance} deposit={deposit} />
            <div className="col-md-8 order-md-1">
              <h4 className="mb-3">Your quote</h4>              
              {makeField('quote', { prepend: '£', type: 'number', className: 'mb-3', label: 'Enter your quote as it appears on the promotional leaflet' })}
              <p>
                The quote above is for trimming publicly accessible part of your hedge.
                Once you order our service we'll come sometime in the next 1-2 weeks to do the trimming. 
                You don't even have to be at home! If you have any questions do email us <a href="mailto:hedge@upkeep.team">hedge@upkeep.team</a>
              </p>
              {makeField('remove', { type: 'checkbox', className: 'mb-3', label: 'Remove trimmings', value: true })}
      				{makeField('Note', { className: 'mb-3', rows: 5, label:'Note - Leave any specific instructions here', type:'textarea', optional: true })}
      				<h4 className="mb-3">Your details</h4>
      				{makeField('name', { className: 'mb-3', placeholder: 'John Smith' })}
      				{makeField('email', { className: 'mb-3', placeholder: 'you@example.com' })}              
      				{makeField('phone', { className: 'mb-3', placeholder: '01234567890' })}                            
      				<h4 className="mb-3">Your address</h4>
      				{makeField('address1', { className: 'mb-3', label:'First Line of Address', placeholder: '123 High Street' })}
      				{makeField('address2', { className: 'mb-3', label:'Second Line of Address', placeholder: 'Ealing', optional: true })}
      				{makeField('postcode', { className: 'mb-3', label:'Post Code', placeholder: 'W6 1XN'})}
           	  <h4 className="mb-3">Payment</h4> 
           	  <div className="mb-3 form-control" style={{ paddingTop: '0.5rem' }}>             
              	<CardElement hidePostalCode={true} />   
              </div>
              <hr className="mb-4" />                         
              <button onClick={this.handleSubmit} disabled={!enabled} className="btn btn-primary btn-lg btn-block" type="submit">{noDeposit ? 'Make a Booking':'Pay £' + deposit.toFixed(2) + ' deposit'}</button>
              {this.state.message?
                <div className="alert alert-info mt-3" role="alert">
                  {this.state.message}
                </div> : null  
              }
            </div>
          </div>       
        </div>
      </form>
    );
  }
}

export default injectStripe(SimpleForm(Checkout));
