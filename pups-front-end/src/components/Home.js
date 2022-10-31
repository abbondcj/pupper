import React from 'react';

export default function Home({ authenticatedUser }) {
  return (
    <div>
      <h1>Welcome to your pup&apos;s home</h1>
      <p>Homeowner: {authenticatedUser.displayName}</p>
    </div>
  );
}
