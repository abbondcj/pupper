import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';
// import Activity from './Activity';

export default function Home({ authenticatedUser, setHouseFilterState }) {
  const [primaryHouse, setPrimaryHouse] = useState(null);
  const [nonPrimaryHouses, setNonPrimaryHouses] = useState(null);
  const [primaryPups, setPrimaryPups] = useState(null);
  const history = useHistory();

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then(
          (data) => {
            if (data !== null) {
              setPrimaryHouse(data[0]);
              const nonPrimaryHouseList = [];
              /* eslint-disable */
              data.map((house) => {
                if (house.id === authenticatedUser.primaryHouseId) {
                  setPrimaryHouse(house);
                  PupsApi.GetPupsByHouseId(house.id, authenticatedUser.Aa)
                    .then((data) => {
                      setPrimaryPups(data);
                    })
                } else {
                  nonPrimaryHouseList.push(house);
                }
              });
              setNonPrimaryHouses(nonPrimaryHouseList);
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
          primaryHouse != null ? primaryPups != null ? <div><h2>Pups</h2>{primaryPups.map((pup) => <p key={pup.id}>{pup.name}</p>)}</div> : <button>Add Pup</button> : ''
        }
        {
          primaryPups != null
          ? <div><button>Details</button><button onClick={() => { setHouseFilterState(primaryHouse.id); history.push("/Activity"); }}>Activity</button></div>
          : ''
        }
      </div>
      <div>
        {
          nonPrimaryHouses != null ? 
          nonPrimaryHouses.map((house) => <div key={house.id}><h1>{house.name}</h1><button>Details</button><button onClick={() => { setHouseFilterState(house.id); history.push("/Activity"); }}>Activity</button></div>) : ``
        }
      </div>
      <div>
        <button>Add Home</button>
      </div>
    </div>
  );
}
