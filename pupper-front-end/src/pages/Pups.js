import React, { useEffect, useState } from 'react';
import '../styles/pups.css';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';
import AddHomeModal from '../components/AddHomeModal';
import AddPupModal from '../components/AddPupModal';
import EditPupModal from '../components/EditPupModal';
import FilteredPups from '../components/FilteredPups';

export default function Pups({ authenticatedUser, setPupFilterState }) {
  const [pupList, setPupList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [showAddPupModal, setShowAddPupModal] = useState(false);
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [showEditPupModal, setShowEditPupModal] = useState(false);
  const [editPupId, setEditPupId] = useState(null);
  const [filter, setFilter] = useState(0);
  const [addPupTrigger, setAddPupTrigger] = useState(false);
  const [editPupTrigger, setEditPupTrigger] = useState(false);
  const [deletePupTrigger, setDeletePupTrigger] = useState(false);
  const [addHouseTrigger, setAddHouseTrigger] = useState(false);

  useEffect(
    () => {
      setAddHouseTrigger(false);
      setAddPupTrigger(false);
      setEditPupTrigger(false);
      setDeletePupTrigger(false);
      setPupList([]);
      PupsApi.GetPupsByOwnerId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setPupList(data);
          }
        });
      setHouseList([]);
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setHouseList(data);
          }
        });
    }, [addPupTrigger, editPupTrigger, deletePupTrigger, addHouseTrigger],
  );

  return (
    <div className="pups-component">
      <h1>Pups</h1>
      <div className="pup-filter-container">
        {/* eslint-disable */}
        <select onChange={(e) => { setFilter(parseInt(e.target.value)); }}>
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
            houseList.length === 0
              ? <button onClick={() => { setShowAddHouseModal(true); }} type="submit">Add House</button>
              : <button onClick={() => { setShowAddPupModal(true); }} type="submit">Add Pup</button>
          }
        </div>
        <div className="pup-container">
          {
            pupList.length > 0
              ? <FilteredPups pupList={pupList} filter={filter} auth={authenticatedUser.Aa} setFilteredPups={setPupFilterState} setPuptoEdit={setEditPupId} showPupEdit={setShowEditPupModal} />
              : <p>No pups</p>
          }
        </div>
        <AddHomeModal user={authenticatedUser} show={showAddHouseModal} setShowModal={setShowAddHouseModal} houseAdded={setAddHouseTrigger} />
        <AddPupModal user={authenticatedUser} show={showAddPupModal} setShowModal={setShowAddPupModal} showHomeDetail={null} houseSelected={0} houseToAddPup={null} triggerAddPup={setAddPupTrigger} />
        <EditPupModal user={authenticatedUser} show={showEditPupModal} setShowModal={setShowEditPupModal} pupSelected={editPupId} setPupSelected={setEditPupId} houses={houseList} triggerEditPup={setEditPupTrigger} triggerDeletePup={setDeletePupTrigger} />
      </div>
    </div>
  );
}
