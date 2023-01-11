import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import '../styles/pup.css';
import HouseApi from '../api/HouseApi';

/* eslint-disable */
function Pup({ pup, authenticatedToken, setFilter, editPup, showEditPup }) {
  const [house, setHouse] = useState({});
  const history = useHistory();

  useEffect(
    () => {
      HouseApi.GetHouseById(pup.houseId, authenticatedToken)
        .then((data) => {
          setHouse(data);
        });
    }, [pup],
  );

  return (
    <div className="pup">
      <h3>{pup.name}</h3>
      <p><b>House: </b>{house.name}</p>
      <p><b>Breed: </b>{pup.breed}</p>
      <p><b>Gender: </b>{pup.gender === 1 || pup.gender ===2 ? pup.gender === 1 ? 'Male' : 'Female' : 'None listed'}</p>
      <p><b>Birthday: </b>{pup.birthday !== null ? pup.birthday.substring(0, 10) : 'None listed'}</p>
      <div className='pup-buttons'>
        <button onClick={(e) => { editPup(parseInt(e.target.value)); showEditPup(true); }} type="submit" value={pup.id || ''}>Edit</button>
        <button type="submit" value={pup.id} onClick={(e) => { setFilter(e.target.value); history.push('/Activity'); }}>View Activity</button>
      </div>
    </div>
  );
}

export default Pup;
