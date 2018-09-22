import React from 'react';

function Order({ quote, discount, promo, total, balance, deposit }) {
  return (
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your order</span>
              {/*
              <span className="badge badge-secondary badge-pill">3</span>
              */}
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Your quote</h6>
                  <small className="text-muted">Hedge trimming</small>
                </div>
                <span className="text-muted">£{quote.toFixed(2)}</span>
              </li>            
              { promo 
                ? <li className="list-group-item d-flex justify-content-between bg-light">
                    <div className="text-success">
                      <h6 className="my-0">Promo code</h6>
                      <small>{promo}</small>
                    </div>
                    <span className="text-success">-£{discount.toFixed(2)}</span>
                  </li>
                : null
              }
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Deposit</h6>
                  <small className="text-muted">To be paid now</small>
                </div>
                <span className="text-muted">£{deposit.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Balance</h6>
                  <small className="text-muted">To be paid upon completion of a job</small>
                </div>
                <span className="text-muted">£{balance.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <span>Total (GBP)</span>
                <strong>£{total.toFixed(2)}</strong>
              </li>
            </ul>
          {/*
            <div className="card p-2">
              <div className="input-group">
                <input className="form-control" placeholder="Promo code" type="text" />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-secondary">Redeem</button>
                </div>
              </div>
            </div>
          */}
          </div>
  );
}

export default Order;
