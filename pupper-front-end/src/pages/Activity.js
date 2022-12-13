import React, { useState } from 'react';
import ActivityFilter from '../components/ActivityFilter';
import AddActivityModal from '../components/AddActivityModal';

export default function Activity({ authenticatedUser, pupFilterProp, houseFilterProp }) {
  const [showAddActivityModal, setShowAddActivityModal] = useState();

  return (
    <div>
      <h1>Activity</h1>
      <button onClick={() => { setShowAddActivityModal(true); }} type="submit">Add activity</button>
      <ActivityFilter user={authenticatedUser} pupPreFilter={pupFilterProp} housePreFilter={houseFilterProp} />
      <AddActivityModal show={showAddActivityModal} user={authenticatedUser} setShowModal={setShowAddActivityModal} />
    </div>
  );
}
