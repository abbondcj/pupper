import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import HouseApi from '../api/HouseApi';

function Pup({ pup, authenticatedToken, setFilter }) {
  const [house, setHouse] = useState({});
  const history = useHistory();

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
      <button type="submit" value={pup.id} onClick={(e) => { setFilter(e.target.value); history.push('/Activity'); }}>View Activity</button>
    </div>
  );
}

export default Pup;
