import React from 'react';

export default function Learn({ authenticatedUser }) {
  return (
    <div>
      <h1>Learn ROUTE</h1>
      <p>Welcome {authenticatedUser.displayName}</p>
    </div>
  );
}
