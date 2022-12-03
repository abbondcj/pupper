import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';

function Pup({ pup, authenticatedToken }) {
  const [house, setHouse] = useState({});

  useEffect(
    () => {
      HouseApi.GetHouseById(pup.houseId, authenticatedToken)
        .then((data) => {
          setHouse(data);
        });
    }, [],
  );

  return (
    <div>
      <h3>{pup.name}</h3>
      <p>{house.name}</p>
      <p>{pup.breed}</p>
      <p>{pup.gender === 1 ? 'Male' : 'Female'}</p>
      <button type="submit" value={pup.id}>Edit</button>
      <button type="submit" value={pup.id}>View Activity</button>
    </div>
  );
}

export default Pup;
