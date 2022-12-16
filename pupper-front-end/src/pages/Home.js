import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';
import AddHomeModal from '../components/AddHomeModal';
import AddPupModal from '../components/AddPupModal';
import EditHomeModal from '../components/EditHouseModal';
import HomeDetailModal from '../components/HomeDetailModal';

export default function Home({ authenticatedUser, setHouseFilterState }) {
  const [primaryHouse, setPrimaryHouse] = useState(null);
  const [nonPrimaryHouses, setNonPrimaryHouses] = useState(null);
  const [primaryPups, setPrimaryPups] = useState(null);
  const [showAddHouseModal, setShowAddHouseModal] = useState(false);
  const [showEditHouseModal, setShowEditHouseModal] = useState(false);
  const [showViewDetailModal, setShowViewDetailModal] = useState(false);
  const [showAddPupModal, setShowAddPupModal] = useState(false);
  const [houseToAddPup, setHousetoAddPup] = useState(null);
  const [houseToEdit, setHouseToEdit] = useState(null);
  const [houseToView, setHouseToView] = useState(null);
  const history = useHistory();

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then(
          (data) => {
            if (data !== null) {
              setPrimaryHouse(data[0]);
              PupsApi.GetPupsByHouseId(data[0].id, authenticatedUser.Aa)
                .then((pupData) => {
                  setPrimaryPups(pupData);
                  const nonPrimaryHouseList = [];
                  /* eslint-disable */
                  data.map((house, index) => {
                    if (house.id === authenticatedUser.primaryHouseId) {
                      setPrimaryHouse(house);
                      if (data[0].id !== house.id) {
                        nonPrimaryHouseList.push(data[0]);
                      }
                      PupsApi.GetPupsByHouseId(house.id, authenticatedUser.Aa)
                        .then((data) => {
                          setPrimaryPups(data);
                        })
                    } else {
                      if (index > 0) {
                        nonPrimaryHouseList.push(house);
                      }
                    }
                  });
                  setNonPrimaryHouses(nonPrimaryHouseList);
                });
            }
          }
        );
    }, [],
  );
  
  return (
    <div>
      <h1>Home</h1>
      <div>
        {
          primaryHouse != null ? <div><h1>{primaryHouse.name}</h1><p>{primaryHouse.address1}</p><p>{primaryHouse.address2}</p><p>{primaryHouse.state + `, ` + primaryHouse.zip}</p></div> : <p>No houses</p>
        }
        {
          primaryHouse != null ? primaryPups != null ? <div><h2>Pups</h2>{primaryPups.map((pup) => <p key={pup.id}>{pup.name}</p>)}</div> : <button type="submit" value={primaryHouse.id} onClick={(e) => { setHousetoAddPup(parseInt(e.target.value)); setShowAddPupModal(true); }}>Add Pup</button> : ''
        }
        {
          primaryHouse != null
          ? <div><button value={primaryHouse.id} onClick={(e) => { setHouseToView(parseInt(e.target.value)); setShowViewDetailModal(true); }}>Details</button><button value={primaryHouse.id} onClick={(e) => { setHouseFilterState(parseInt(e.target.value));  history.push("/Activity"); }}>Activity</button></div>
          : ''
        }
      </div>
      <div>
        {
          nonPrimaryHouses != null ? 
          nonPrimaryHouses.map((house) => <div key={house.id}><h1>{house.name}</h1><button value={house.id} onClick={(e) => { setHouseToView(parseInt(e.target.value)); setShowViewDetailModal(true);  }}>Details</button><button onClick={async () => { await setHouseFilterState(house.id);  history.push("/Activity"); }}>Activity</button></div>) : ``
        }
      </div>
      <div>
        <button onClick={() => { setShowAddHouseModal(true); }}>Add Home</button>
        <AddPupModal user={authenticatedUser} show={showAddPupModal} setShowModal={setShowAddPupModal} houseSelected={houseToAddPup} showHomeDetail={setShowViewDetailModal} />
        <AddHomeModal user={authenticatedUser} show={showAddHouseModal} setShowModal={setShowAddHouseModal} />
        <EditHomeModal user={authenticatedUser} show={showEditHouseModal} setShowModal={setShowEditHouseModal} houseId={houseToEdit} setShowDetail={setShowViewDetailModal} />
        <HomeDetailModal user={authenticatedUser} show={showViewDetailModal} setShowModal={setShowViewDetailModal} houseId={houseToView} setHomeToEdit={setHouseToEdit} showEditModal={setShowEditHouseModal} houseToAddPup={setHousetoAddPup} showAddPup={setShowAddPupModal} />
      </div>
    </div>
  );
}
