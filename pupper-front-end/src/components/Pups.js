import React from 'react';

export default function Pups({ authenticatedUser }) {
  return (
    <div>
      <h1>Pups ROUTE</h1>
      <p>Welcome {authenticatedUser.displayName}</p>
    </div>
  );
}
