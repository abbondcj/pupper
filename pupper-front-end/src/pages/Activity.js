import React from 'react';
import ActivityFilter from '../components/ActivityFilter';

export default function Activity({ authenticatedUser, pupFilterProp, houseFilterProp }) {
  return (
    <div>
      <h1>Activity ROUTE</h1>
      <p>Welcome {authenticatedUser.displayName}</p>
      <ActivityFilter user={authenticatedUser} pupPreFilter={pupFilterProp} housePreFilter={houseFilterProp} />
    </div>
  );
}
