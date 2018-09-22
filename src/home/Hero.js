import React from 'react';
import Zoom from 'react-reveal/Zoom';

function heading(first, second) {
  return (
    <h1 className="text-center">
      <Zoom left cascade duration={1200} delay={100} ssrReveal>
        <div style={{display: 'inline-block'}}>
          {first}
        </div>
      </Zoom>
      <span style={{whiteSpace:'pre'}}> </span>
      <Zoom right cascade duration={1200} delay={100} ssrReveal>
        <div style={{display: 'inline-block'}}>
          {second}
        </div>
      </Zoom>
    </h1>
  );
}

function Hero() {
  return (
  	<div id="bg" style={{ backgroundImage: `url(/assets/hedge4.jpg)` }}>
      <div className="container jumbotron mt-5">
        <div className="mx-4 text-center">             
             {heading('Upkeep', 'Team')}
      <p className="lead"><em>Upkeep Team</em> is an 
                      innovative gardening service that is focused on hedge trimming. A sort of Uber for hedge trimming.
                      We're currently operating in West London, UK but plan to expand to other areas both nationally and internationally. </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
