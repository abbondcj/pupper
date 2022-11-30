import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';

export default function Home({ authenticatedUser }) {
  const [primaryHouse, setPrimaryHouse] = useState(null);
  const [nonPrimaryHouses, setNonPrimaryHouses] = useState(null);
  const [primaryPups, setPrimaryPups] = useState(null);
  console.log(authenticatedUser);

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then(
          (data) => {
            setPrimaryHouse(data[0]);
            const nonPrimaryHouseList = [];
            /* eslint-disable */
            data.map((house) => {
              if (house.id === authenticatedUser.primaryHouseId) {
                setPrimaryHouse(house);
                console.log("primary detected");
              } else {
                nonPrimaryHouseList.push(house);
              }
            });
            setNonPrimaryHouses(nonPrimaryHouseList);
          }
        )
        .then(() => {
          PupsApi.GetPupsByHouseId(primaryHouse.id, authenticatedUser.Aa)
            .then((data) => {
              setPrimaryPups(data);
            })
        })
    }, [],
  );
  return (
    <div>
      <h1>Home</h1>
      <p><b>Homeowner:</b> {authenticatedUser.firstName + ` ` + authenticatedUser.lastName}</p>
      <div>
        {
          primaryHouse != null ? <div><h1>{primaryHouse.name}</h1><p>{primaryHouse.address1}</p><p>{primaryHouse.address2}</p><p>{primaryHouse.state + `, ` + primaryHouse.zip}</p></div> : ``
        }
        {
          primaryPups != null ? <div><h2>Pups</h2>{primaryPups.map((pup) => <p>{pup.name}</p>)}</div> : <button>Add Pup</button>
        }
        <button>Details</button>
        <button>Activity</button>
      </div>
      <div>
        {
          nonPrimaryHouses != null ? 
          nonPrimaryHouses.map((house) => <div key={house.id}><h1>{house.name}</h1><button>Details</button><button>Activity</button></div>) : ``
        }
      </div>
      <div>
        <button>Add Home</button>
      </div>
    </div>
  );
}
