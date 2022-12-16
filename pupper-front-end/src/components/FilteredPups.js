import React, { useEffect, useState } from 'react';
import Pup from './Pup';

/* eslint-disable */ 
function FilteredPups({ pupList, filter, auth, setFilteredPups, setPuptoEdit, showPupEdit }) {
  const [pups, setPups] = useState([]);

  useEffect(
    () => {
      const result = [];
      if (filter === '0') {
        setPups(pupList)
      } else {
        pupList.map((pup) => {
          if (pup.houseId === parseInt(filter)) {
            result.push(pup);
          }
        });
        setPups(result);
      }
    }, [pupList]
  )

  return (
    pups.length > 0
    ? pups.map((pup) => {
      return(<div key={pup.id}><Pup pup={pup} authenticatedToken={auth} setFilter={setFilteredPups} editPup={setPuptoEdit} showEditPup={showPupEdit} /></div>);
    })
    : <p>No Pups</p>
  )
}

export default FilteredPups;

