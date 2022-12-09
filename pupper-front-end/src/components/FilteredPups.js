import React from 'react';
import Pup from './Pup';

/* eslint-disable */ 
function FilteredPups({ pupList, filter, auth, setFilteredPups }) {
  const pups = [];

  if (filter === '0') {
    /* eslint-disable */
    pupList.map((pup) => {
        pups.push(pup);
    })
  } else {
    pupList.map((pup) => {
      if (pup.houseId === parseInt(filter)) {
        pups.push(pup);
    }
    });
  }

  return (
    pups.length > 0
    ? pups.map((pup) => {
      return(<div key={pup.id}><Pup pup={pup} authenticatedToken={auth} setFilter={setFilteredPups} /></div>);
    })
    : <p>No Pups</p>
  )
}

export default FilteredPups;

