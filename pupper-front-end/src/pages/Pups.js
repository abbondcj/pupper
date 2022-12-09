import React, { useEffect, useState } from 'react';
import HouseApi from '../api/HouseApi';
import PupsApi from '../api/PupsApi';
import FilteredPups from '../components/FilteredPups';

export default function Pups({ authenticatedUser, setPupFilterState }) {
  const [pupList, setPupList] = useState([]);
  const [houseList, setHouseList] = useState([]);
  const [filter, setFilter] = useState('0');

  useEffect(
    () => {
      PupsApi.GetPupsByOwnerId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setPupList(data);
          }
        });
      HouseApi.GetHousesByUserId(authenticatedUser.id, authenticatedUser.Aa)
        .then((data) => {
          if (data !== null) {
            setHouseList(data);
          }
        });
    }, [],
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
            houseList.length > 0
              ? <button type="submit">Add pup</button>
              : <button type="submit">Add house</button>
          }
        </div>
      </div>
    </div>
  );
}
