import React, { useState } from 'react';

function Profile({ authenticatedUser }) {
  const [user] = useState(authenticatedUser);
  const [firstName, lastName] = user.displayName.split(' ');

  return (
    <div>
      <h1>Profile ROUTE</h1>
      <p>First Name: {firstName}</p>
      <p>Last Name: {lastName}</p>
    </div>
  );
}

export default Profile;
