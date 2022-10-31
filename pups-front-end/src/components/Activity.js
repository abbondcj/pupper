import React from 'react';

export default function Activity({ authenticatedUser }) {
  return (
    <div>
      <h1>Activity ROUTE</h1>
      <p>Welcome {authenticatedUser.displayName}</p>
    </div>
  );
}
