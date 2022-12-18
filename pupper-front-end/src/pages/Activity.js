import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';
import ActivityFilter from '../components/ActivityFilter';
import AddActivityModal from '../components/AddActivityModal';

export default function Activity({ authenticatedUser, pupFilterProp, houseFilterProp }) {
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [houseExists, setHouseExists] = useState(false);
  const [pupExists, setPupExists] = useState(false);

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setHouseExists(true);
          }
        });
      PupsApi.GetPupsByOwnerId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setPupExists(true);
          }
        });
    }, [],
  );

  return (
    <div>
      <h1>Activity</h1>
      {
        /* eslint-disable */
        houseExists === false || pupExists === false 
          ? <p>You must first add a house and pup</p>
          : <button onClick={() => { setShowAddActivityModal(true); }} type="submit">Add activity</button>
      }
      <ActivityFilter user={authenticatedUser} pupPreFilter={pupFilterProp} housePreFilter={houseFilterProp} showAddActivity={showAddActivityModal} />
      <AddActivityModal show={showAddActivityModal} user={authenticatedUser} setShowModal={setShowAddActivityModal} />
    </div>
  );
}
