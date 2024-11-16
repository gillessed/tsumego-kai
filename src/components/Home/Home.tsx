import React from 'react';
import "./Home.css";

export const Home = React.memo(() => {
  return (
    <div className='home-container effect-fade-in'>
      <div className='home-jumbotron'>
        <h1>Tsumego Kai</h1>
        <p>Get better at Go in a better way</p>
      </div>
    </div>
  );
});
