import React from 'react';
import Banner from '../components/Banner';

function Landing() {
  return (
    <>
      <Banner showLogin />
      <h1>Pupper</h1>
      <div>
        <p>Welcome to Pupper</p>
        <p>Keep track of your pup&apos;s progress</p>
        <p>Learn to be a great pup parent</p>
      </div>
    </>
  );
}

export default Landing;
