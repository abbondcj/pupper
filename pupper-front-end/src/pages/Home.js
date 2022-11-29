import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';

export default function Home({ authenticatedUser }) {
  console.log(authenticatedUser);
  const [houses, setUserHouses] = useState([]);
  const [primaryHouse, setPrimaryHouse] = useState({});
  const [nonPrimaryHouses, setNonPrimaryHouses] = useState([]);

  useEffect(
    () => {
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then(
          (data) => {
            const nonPrimaryHouseList = [];
            data.map((house) => {
              if (house.id === authenticatedUser.primaryHouse) {
                setPrimaryHouse(house);
              } else {
                nonPrimaryHouses.push(house);
              }
            });
            setUserHouses(data); 
            setNonPrimaryHouses(nonPrimaryHouseList);
          }
        );
    }, [],
  );
  return (
    <div>
      <h1>Welcome to your pup&apos;s home</h1>
      <p>Homeowner: {authenticatedUser.displayName}</p>
      <div>
        {
          <h1>{houses.length > 0 ? primaryHouse.name : ``}</h1>
        }
        {
          <p>{primaryHouse.Address1}</p>
        }
      </div>
      <div>
        {nonPrimaryHouses.map((house) => <div key={house.id}><h1>{house.name}</h1></div>)}
      </div>
    </div>
  );
}
