import React from 'react';
import landingPhoto from '../assets/landing-photo.png';
import '../styles/landing.css';
import Banner from '../components/Banner';

function Landing() {
  return (
    <>
      <Banner showLogin />
      <div className="landing-intro">
        <h1>Pupper</h1>
        <p>Welcome to Pupper</p>
        <p>Keep track of your pup&apos;s progress</p>
        <p>Learn to be a great pup parent</p>
        <img src={landingPhoto} alt="landing" />
      </div>
    </>
  );
}

export default Landing;
