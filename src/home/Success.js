import React from 'react';

function Success({ message }) {
  return (
    <div className="container mt-4">        
  		<h2>{message}</h2>
  		<p>Congratulations, your order has been placed. We will be in contact with your shortly. 
  		If you have any questions email us <a href="mailto:hedge@upkeep.team">hedge@upkeep.team</a></p>
    </div>
  );
}

export default Success;