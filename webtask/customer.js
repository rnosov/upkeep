'use latest';

import express from 'express';
import { fromExpress } from 'webtask-tools';
import bodyParser from 'body-parser';
import Stripe from 'stripe';

var app = express();
app.use(bodyParser.json({ type: 'text/plain' }));

app.post('/', (req,res) => {
  var ctx = req.webtaskContext;
  var stripe = Stripe(req.query.mode === 'live' ? ctx.secrets.STRIPE_LIVE_KEY : ctx.secrets.STRIPE_TEST_KEY);
  const { source, email, ...metadata } = req.body;   
  let status = 200, message = 'Booking made';
  stripe.customers.create({ source, email, metadata }, (err, customer) => {
    //console.log(customer);
    if (!err && customer) {        		
  			res.writeHead(status, { 'Content-Type': 'application/json' });
    		return res.end(JSON.stringify({ message }));
    }
    else {
    	status = 400;
    	message = err.message;    	
  		res.writeHead(status, { 'Content-Type': 'application/json' });
    	return res.end(JSON.stringify({ message }));
    }    
  });
});

module.exports = fromExpress(app);  
