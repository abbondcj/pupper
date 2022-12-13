import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';
import AddHomeModal from '../components/AddHomeModal';
import AddPupModal from '../components/AddPupModal';
import FilteredPups from '../components/FilteredPups';

export default function Pups({ authenticatedUser, setPupFilterState }) {
  const [pupList, setPupList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [showAddPupModal, setShowAddPupModal] = useState(false);
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [addNewPup, setAddNewPup] = useState(false);
  const [addNewHouse, setAddNewHouse] = useState(false);
  const [filter, setFilter] = useState('0');

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setHouseList(data);
          }
        });
    }, [addNewHouse],
  );

  useEffect(
    () => {
      PupsApi.GetPupsByOwnerId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setPupList(data);
          }
        });
    }, [addNewPup],
  );

  return (
    <div>
      <h1>Pups</h1>
      <div>
        <select onChange={(e) => { setFilter(e.target.value); }}>
          {
            houseList.length > 0
              ? <option value="0">All houses</option>
              : <option>No houses</option>
          }
          {
            houseList.length > 0
              ? houseList.map((house) => <option key={house.id} value={house.id}>{house.name}</option>)
              : ''
          }
        </select>
        <div>
          {
            pupList.length > 0
              ? <FilteredPups pupList={pupList} filter={filter} auth={authenticatedUser.Aa} setFilteredPups={setPupFilterState} />
              : <p>No pups</p>
          }
        </div>
        <div>
          {
            houseList.length === 0
              ? <button onClick={() => { setShowAddHouseModal(true); }} type="submit">Add House</button>
              : <button onClick={() => { setShowAddPupModal(true); }} type="submit">Add Pup</button>
          }
        </div>
        <AddHomeModal user={authenticatedUser} show={showAddHouseModal} setShowModal={setShowAddHouseModal} newHouseAdded={setAddNewHouse} />
        <AddPupModal user={authenticatedUser} show={showAddPupModal} setShowModal={setShowAddPupModal} newPupAdded={setAddNewPup} houseSelected={null} />
      </div>
    </div>
  );
}
